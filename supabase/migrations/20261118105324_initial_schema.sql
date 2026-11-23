
-- ============================================================
-- ACTMAP: INITIAL DATABASE SCHEMA
-- Phase 2: Dashboard and Schema
-- ============================================================

-- ------------------------------------------------------------
-- 1. ORGANIZATIONS
-- Clerk remains the source of truth.
-- This table provides relational integrity inside PostgreSQL.
-- ------------------------------------------------------------

create table public.organizations (
    id text primary key,
    name text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

comment on table public.organizations is
    'Registry of Clerk organizations for database referential integrity.';


-- ------------------------------------------------------------
-- 2. PROJECTS
-- ------------------------------------------------------------

create table public.projects (
    id uuid primary key default gen_random_uuid(),
    organization_id text not null
        references public.organizations(id) on delete cascade,

    name text not null,
    repository_url text not null,
    default_branch text not null default 'main',
    provider text not null default 'github'
        check (provider in ('github', 'gitlab', 'bitbucket', 'other')),

    created_by text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    unique (id, organization_id),
    unique (organization_id, repository_url)
);


-- ------------------------------------------------------------
-- 3. ANALYSES
-- ------------------------------------------------------------

create table public.analyses (
    id uuid primary key default gen_random_uuid(),
    organization_id text not null
        references public.organizations(id) on delete cascade,

    project_id uuid not null,
    status text not null default 'queued'
        check (status in (
            'queued',
            'running',
            'completed',
            'failed',
            'cancelled'
        )),

    summary text,
    requested_by text,
    started_at timestamptz,
    completed_at timestamptz,
    error_message text,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    unique (id, organization_id),

    foreign key (project_id, organization_id)
        references public.projects(id, organization_id)
        on delete cascade
);


-- ------------------------------------------------------------
-- 4. FILES
-- ------------------------------------------------------------

create table public.files (
    id uuid primary key default gen_random_uuid(),
    organization_id text not null
        references public.organizations(id) on delete cascade,

    analysis_id uuid not null,
    path text not null,
    language text,
    size_bytes bigint check (size_bytes >= 0),
    content_hash text,
    is_binary boolean not null default false,
    metadata jsonb not null default '{}'::jsonb,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    unique (id, organization_id),
    unique (id, analysis_id, organization_id),
    unique (analysis_id, path),

    foreign key (analysis_id, organization_id)
        references public.analyses(id, organization_id)
        on delete cascade
);


-- ------------------------------------------------------------
-- 5. EDGES
-- Relationships between files in an analysis.
-- ------------------------------------------------------------

create table public.edges (
    id uuid primary key default gen_random_uuid(),
    organization_id text not null
        references public.organizations(id) on delete cascade,

    analysis_id uuid not null,
    source_file_id uuid not null,
    target_file_id uuid not null,

    edge_type text not null,
    metadata jsonb not null default '{}'::jsonb,

    created_at timestamptz not null default now(),

    unique (id, organization_id),

    foreign key (analysis_id, organization_id)
        references public.analyses(id, organization_id)
        on delete cascade,

    foreign key (source_file_id, analysis_id, organization_id)
        references public.files(id, analysis_id, organization_id)
        on delete cascade,

    foreign key (target_file_id, analysis_id, organization_id)
        references public.files(id, analysis_id, organization_id)
        on delete cascade,

    check (source_file_id <> target_file_id)
);


-- ------------------------------------------------------------
-- 6. ROUTES
-- Paths and navigation routes discovered in the codebase.
-- ------------------------------------------------------------

create table public.routes (
    id uuid primary key default gen_random_uuid(),
    organization_id text not null
        references public.organizations(id) on delete cascade,

    analysis_id uuid not null,
    entry_file_id uuid,
    exit_file_id uuid,

    path jsonb not null default '[]'::jsonb
        check (jsonb_typeof(path) = 'array'),

    route_type text,
    metadata jsonb not null default '{}'::jsonb,

    created_at timestamptz not null default now(),

    unique (id, organization_id),

    foreign key (analysis_id, organization_id)
        references public.analyses(id, organization_id)
        on delete cascade,

    foreign key (entry_file_id, analysis_id, organization_id)
        references public.files(id, analysis_id, organization_id)
        on delete cascade,

    foreign key (exit_file_id, analysis_id, organization_id)
        references public.files(id, analysis_id, organization_id)
        on delete cascade
);


-- ------------------------------------------------------------
-- 7. EXPLANATIONS
-- ------------------------------------------------------------

create table public.explanations (
    id uuid primary key default gen_random_uuid(),
    organization_id text not null
        references public.organizations(id) on delete cascade,

    analysis_id uuid not null,
    file_id uuid,

    explanation_type text not null,
    content text not null,
    metadata jsonb not null default '{}'::jsonb,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    unique (id, organization_id),

    foreign key (analysis_id, organization_id)
        references public.analyses(id, organization_id)
        on delete cascade,

    foreign key (file_id, analysis_id, organization_id)
        references public.files(id, analysis_id, organization_id)
        on delete cascade
);


-- ------------------------------------------------------------
-- 8. FILE ROLES
-- ------------------------------------------------------------

create table public.file_roles (
    id uuid primary key default gen_random_uuid(),
    organization_id text not null
        references public.organizations(id) on delete cascade,

    analysis_id uuid not null,
    file_id uuid not null,

    role text not null,
    confidence numeric(5,4)
        check (confidence between 0 and 1),

    evidence jsonb not null default '{}'::jsonb,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    unique (id, organization_id),
    unique (analysis_id, file_id, role),

    foreign key (analysis_id, organization_id)
        references public.analyses(id, organization_id)
        on delete cascade,

    foreign key (file_id, analysis_id, organization_id)
        references public.files(id, analysis_id, organization_id)
        on delete cascade
);


-- ------------------------------------------------------------
-- 9. INSIGHTS
-- ------------------------------------------------------------

create table public.insights (
    id uuid primary key default gen_random_uuid(),
    organization_id text not null
        references public.organizations(id) on delete cascade,

    analysis_id uuid not null,
    source_file_id uuid,

    insight_type text not null,
    title text not null,
    description text,
    severity text
        check (severity in ('info', 'low', 'medium', 'high', 'critical')),

    metadata jsonb not null default '{}'::jsonb,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    unique (id, organization_id),

    foreign key (analysis_id, organization_id)
        references public.analyses(id, organization_id)
        on delete cascade,

    foreign key (source_file_id, analysis_id, organization_id)
        references public.files(id, analysis_id, organization_id)
        on delete cascade
);


-- ============================================================
-- INDEXES
-- ============================================================

create index projects_organization_id_idx
    on public.projects(organization_id);

create index analyses_organization_created_idx
    on public.analyses(organization_id, created_at desc);

create index analyses_project_id_idx
    on public.analyses(project_id);

create index analyses_project_org_idx
    on public.analyses(project_id, organization_id);

create index files_organization_id_idx
    on public.files(organization_id);

create index files_analysis_id_idx
    on public.files(analysis_id);

create index files_analysis_org_idx
    on public.files(analysis_id, organization_id);

create index edges_analysis_id_idx
    on public.edges(analysis_id);

create index edges_source_file_idx
    on public.edges(source_file_id);

create index edges_target_file_idx
    on public.edges(target_file_id);

create index edges_source_file_analysis_org_idx
    on public.edges(source_file_id, analysis_id, organization_id);

create index routes_analysis_id_idx
    on public.routes(analysis_id);

create index explanations_analysis_id_idx
    on public.explanations(analysis_id);

create index file_roles_analysis_id_idx
    on public.file_roles(analysis_id);

create index insights_analysis_id_idx
    on public.insights(analysis_id);


-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger organizations_set_updated_at
before update on public.organizations
for each row execute function public.set_updated_at();

create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

create trigger analyses_set_updated_at
before update on public.analyses
for each row execute function public.set_updated_at();

create trigger files_set_updated_at
before update on public.files
for each row execute function public.set_updated_at();

create trigger explanations_set_updated_at
before update on public.explanations
for each row execute function public.set_updated_at();

create trigger file_roles_set_updated_at
before update on public.file_roles
for each row execute function public.set_updated_at();

create trigger insights_set_updated_at
before update on public.insights
for each row execute function public.set_updated_at();


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.organizations enable row level security;
alter table public.projects enable row level security;
alter table public.analyses enable row level security;
alter table public.files enable row level security;
alter table public.edges enable row level security;
alter table public.routes enable row level security;
alter table public.explanations enable row level security;
alter table public.file_roles enable row level security;
alter table public.insights enable row level security;

alter table public.organizations force row level security;
alter table public.projects force row level security;
alter table public.analyses force row level security;
alter table public.files force row level security;
alter table public.edges force row level security;
alter table public.routes force row level security;
alter table public.explanations force row level security;
alter table public.file_roles force row level security;
alter table public.insights force row level security;


-- ============================================================
-- ORGANIZATION POLICY
-- A user can only read their active Clerk organization.
-- Registry writes are reserved for trusted provisioning.
-- ============================================================

create policy organizations_select_own
on public.organizations
for select
to authenticated
using (
    id = coalesce(
        (select auth.jwt() ->> 'org_id'),
        (select auth.jwt() -> 'o' ->> 'id')
    )
);


-- ============================================================
-- TENANT POLICIES
-- All operations are restricted to the active organization.
-- Supports both expanded and compact Clerk JWT claims.
-- ============================================================

create policy projects_tenant_access
on public.projects
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

create policy analyses_tenant_access
on public.analyses
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

create policy files_tenant_access
on public.files
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

create policy edges_tenant_access
on public.edges
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

create policy routes_tenant_access
on public.routes
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

create policy explanations_tenant_access
on public.explanations
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

create policy file_roles_tenant_access
on public.file_roles
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

create policy insights_tenant_access
on public.insights
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


-- ============================================================
-- PRIVILEGES
-- ============================================================

grant usage on schema public to authenticated;

grant select on public.organizations to authenticated;

grant select, insert, update, delete
on public.projects,
   public.analyses,
   public.files,
   public.edges,
   public.routes,
   public.explanations,
   public.file_roles,
   public.insights
to authenticated;
