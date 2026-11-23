-- Phase 10: a cache for model answers, keyed on content.
--
-- The key is a hash of the thing explained, the prompt version and the model,
-- so it has no foreign key to a file: a re-run of the analysis deletes and
-- recreates every file row, and the cache must survive that.

create table if not exists public.explanation_cache (
    id uuid primary key default gen_random_uuid(),
    organization_id text not null
        references public.organizations(id) on delete cascade,

    cache_key text not null,
    kind text not null check (kind in ('file', 'folder', 'role')),
    subject text not null,
    model text not null,
    prompt_version text not null,
    content text not null,
    -- Exactly the paths the model was shown. The invented-path check tests against this.
    allowed_paths jsonb not null default '[]'::jsonb,
    usage jsonb not null default '{}'::jsonb,

    created_at timestamptz not null default now(),

    unique (organization_id, cache_key)
);

create index if not exists explanation_cache_org_created_idx
    on public.explanation_cache (organization_id, created_at desc);

alter table public.explanation_cache enable row level security;
alter table public.explanation_cache force row level security;

drop policy if exists explanation_cache_tenant_access on public.explanation_cache;

create policy explanation_cache_tenant_access
on public.explanation_cache
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

grant select, insert, update, delete on public.explanation_cache to authenticated;

notify pgrst, 'reload schema';
