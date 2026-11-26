-- Conversation history for the Ask feature when the agent runs inside the
-- Next.js server (Vercel). Each thread belongs to one user, in one
-- organization, about one analysis. Only finished question/answer text is
-- stored: no credentials, no tool output, no source code.

create table public.ask_threads (
    id uuid primary key default gen_random_uuid(),

    organization_id text not null,
    user_id text not null,
    analysis_id uuid not null,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint ask_threads_analysis_fk
        foreign key (analysis_id, organization_id)
        references public.analyses(id, organization_id)
        on delete cascade
);

create index ask_threads_owner_idx
    on public.ask_threads (user_id, organization_id, analysis_id, updated_at desc);

create table public.ask_messages (
    id bigint generated always as identity primary key,

    thread_id uuid not null references public.ask_threads(id) on delete cascade,

    -- Denormalised so a per-user rate limit is one indexed count.
    user_id text not null,

    role text not null check (role in ('user', 'assistant')),
    content text not null check (char_length(content) between 1 and 20000),

    created_at timestamptz not null default now()
);

create index ask_messages_thread_idx on public.ask_messages (thread_id, id);
create index ask_messages_rate_idx on public.ask_messages (user_id, created_at desc)
    where role = 'user';

-- The server reads and writes with the service key after checking the
-- Clerk session, organization and analysis. These policies are the backstop:
-- a signed-in user can only ever see their own threads in their own organization.
alter table public.ask_threads enable row level security;
alter table public.ask_threads force row level security;
alter table public.ask_messages enable row level security;
alter table public.ask_messages force row level security;

create policy ask_threads_owner_access
on public.ask_threads
for all
to authenticated
using (
    user_id = (select auth.jwt() ->> 'sub')
    and organization_id = coalesce(
        (select auth.jwt() ->> 'org_id'),
        (select auth.jwt() -> 'o' ->> 'id')
    )
)
with check (
    user_id = (select auth.jwt() ->> 'sub')
    and organization_id = coalesce(
        (select auth.jwt() ->> 'org_id'),
        (select auth.jwt() -> 'o' ->> 'id')
    )
);

create policy ask_messages_owner_access
on public.ask_messages
for all
to authenticated
using (
    user_id = (select auth.jwt() ->> 'sub')
    and exists (
        select 1 from public.ask_threads t
        where t.id = ask_messages.thread_id
          and t.user_id = (select auth.jwt() ->> 'sub')
    )
)
with check (
    user_id = (select auth.jwt() ->> 'sub')
);

notify pgrst, 'reload schema';
