-- Seed demo organizations.
-- These IDs must match the Clerk organization IDs.

insert into public.organizations (id, name)
values
    (
        'org_3MFQaFqflIJewXCl9gAyBSwtMej',
        'Actmap Workspace'
    ),
    (
        'org_3MHATFFyrQpb66ObaDJAwUsZjck',
        'Actmap QA Team'
    )
on conflict (id) do update
set
    name = excluded.name,
    updated_at = now();


-- Demo projects for each organization.

insert into public.projects (
    id,
    organization_id,
    name,
    repository_url,
    default_branch,
    provider,
    created_by
)
values
    (
        'a1000000-0000-4000-8000-000000000001',
        'org_3MFQaFqflIJewXCl9gAyBSwtMej',
        'Actmap Demo Repository',
        'https://github.com/example/actmap-demo',
        'main',
        'github',
        'user_3MFQYniTc8AGj1QEslWlmBqQYnD'
    ),
    (
        'a2000000-0000-4000-8000-000000000001',
        'org_3MHATFFyrQpb66ObaDJAwUsZjck',
        'Actmap QA Repository',
        'https://github.com/example/actmap-qa-demo',
        'main',
        'github',
        'user_3MFQYniTc8AGj1QEslWlmBqQYnD'
    )
on conflict (id) do nothing;


-- Demo analyses for the first organization.

insert into public.analyses (
    id,
    organization_id,
    project_id,
    status,
    summary,
    requested_by,
    started_at,
    completed_at
)
values
    (
        'b1000000-0000-4000-8000-000000000001',
        'org_3MFQaFqflIJewXCl9gAyBSwtMej',
        'a1000000-0000-4000-8000-000000000001',
        'completed',
        'Demo analysis record. No repository scan has been performed.',
        'user_3MFQYniTc8AGj1QEslWlmBqQYnD',
        now() - interval '2 hours',
        now() - interval '1 hour 58 minutes'
    ),
    (
        'b1000000-0000-4000-8000-000000000002',
        'org_3MFQaFqflIJewXCl9gAyBSwtMej',
        'a1000000-0000-4000-8000-000000000001',
        'failed',
        'Demo failed analysis record for dashboard status testing.',
        'user_3MFQYniTc8AGj1QEslWlmBqQYnD',
        now() - interval '1 day',
        null
    );


-- Demo analyses for the second organization.

insert into public.analyses (
    id,
    organization_id,
    project_id,
    status,
    summary,
    requested_by,
    started_at,
    completed_at
)
values
    (
        'b2000000-0000-4000-8000-000000000001',
        'org_3MHATFFyrQpb66ObaDJAwUsZjck',
        'a2000000-0000-4000-8000-000000000001',
        'queued',
        'Demo queued analysis record for dashboard status testing.',
        'user_3MFQYniTc8AGj1QEslWlmBqQYnD',
        null,
        null
    ),
    (
        'b2000000-0000-4000-8000-000000000002',
        'org_3MHATFFyrQpb66ObaDJAwUsZjck',
        'a2000000-0000-4000-8000-000000000001',
        'completed',
        'Demo analysis record. No repository scan has been performed.',
        'user_3MFQYniTc8AGj1QEslWlmBqQYnD',
        now() - interval '3 hours',
        now() - interval '2 hours 58 minutes'
    )
on conflict (id) do nothing;