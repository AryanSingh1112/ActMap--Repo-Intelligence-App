-- ============================================================
-- ACTMAP: PHASE 7 - THE PIPELINE
-- Stages, stored map columns, live progress over Realtime.
-- ============================================================

-- ------------------------------------------------------------
-- 1. ANALYSES: stage tracking, failure details, coverage
-- ------------------------------------------------------------

alter table public.analyses
    add column if not exists stage text,
    add column if not exists stage_message text,
    add column if not exists failed_stage text,
    add column if not exists coverage jsonb,
    add column if not exists stats jsonb;

alter table public.analyses
    drop constraint if exists analyses_stage_check;

alter table public.analyses
    add constraint analyses_stage_check
    check (stage is null or stage in ('fetch', 'select', 'parse', 'store'));

alter table public.analyses
    drop constraint if exists analyses_failed_stage_check;

alter table public.analyses
    add constraint analyses_failed_stage_check
    check (failed_stage is null or failed_stage in ('fetch', 'select', 'parse', 'store'));

-- One analysis per repository. Only enforced when existing data allows it,
-- so this migration never deletes anyone's rows. The application also checks.
do $$
begin
    if not exists (
        select 1
        from public.analyses
        group by project_id
        having count(*) > 1
    ) then
        create unique index if not exists analyses_one_per_project_idx
            on public.analyses (project_id);
    end if;
end
$$;


-- ------------------------------------------------------------
-- 2. FILES: columns the explorer reads directly
-- ------------------------------------------------------------

alter table public.files
    add column if not exists folder_path text,
    add column if not exists extension text,
    add column if not exists kind text,
    add column if not exists line_count integer check (line_count >= 0);


-- ------------------------------------------------------------
-- 3. LIVE PROGRESS
-- A trigger on our own table publishes the stage and its message.
-- It publishes to one private topic per analysis: analysis:<id>
-- ------------------------------------------------------------

create or replace function public.publish_analysis_progress()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    perform realtime.send(
        jsonb_build_object(
            'status', new.status,
            'stage', new.stage,
            'message', coalesce(new.error_message, new.stage_message),
            'failed_stage', new.failed_stage
        ),
        'progress',
        'analysis:' || new.id::text,
        true
    );

    return new;
end;
$$;

revoke all on function public.publish_analysis_progress()
    from public, anon, authenticated;

drop trigger if exists analyses_publish_progress on public.analyses;

create trigger analyses_publish_progress
after insert or update of status, stage, stage_message, error_message, failed_stage
on public.analyses
for each row
execute function public.publish_analysis_progress();


-- ------------------------------------------------------------
-- 4. WHO MAY SUBSCRIBE
-- The channel pattern analysis:<uuid> is declared here, and a
-- subscriber may only join the channel of an analysis that belongs
-- to the organization in their token. Same rule as the rows.
-- ------------------------------------------------------------

drop policy if exists analysis_progress_subscribe on realtime.messages;

create policy analysis_progress_subscribe
on realtime.messages
for select
to authenticated
using (
    realtime.messages.extension = 'broadcast'
    and (select realtime.topic()) like 'analysis:%'
    and exists (
        select 1
        from public.analyses a
        where 'analysis:' || a.id::text = (select realtime.topic())
          and a.organization_id = coalesce(
              (select auth.jwt() ->> 'org_id'),
              (select auth.jwt() -> 'o' ->> 'id')
          )
    )
);
