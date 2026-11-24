
-- Store source code separately from repository structure.

create table public.file_contents (
    id uuid primary key default gen_random_uuid(),

    organization_id text not null,
    analysis_id uuid not null,
    file_id uuid not null,

    content text not null,
    content_hash text not null,
    line_count integer not null check (line_count >= 0),

    created_at timestamptz not null default now(),

    constraint file_contents_file_unique unique (file_id),

    constraint file_contents_file_fk
        foreign key (file_id, analysis_id, organization_id)
        references public.files(id, analysis_id, organization_id)
        on delete cascade
);

create index file_contents_analysis_org_idx
    on public.file_contents (analysis_id, organization_id);

alter table public.file_contents enable row level security;
alter table public.file_contents force row level security;

create policy file_contents_tenant_access
on public.file_contents
for all
to authenticated
using (
    organization_id = coalesce(
        (select auth.jwt() ->> 'org_id'),
        (select auth.jwt() -> 'o' ->> 'id')
    )
)
with check (
    organization_id = coalesce(
        (select auth.jwt() ->> 'org_id'),
        (select auth.jwt() -> 'o' ->> 'id')
    )
);

grant select, insert, update, delete
on public.file_contents to authenticated;

notify pgrst, 'reload schema';
