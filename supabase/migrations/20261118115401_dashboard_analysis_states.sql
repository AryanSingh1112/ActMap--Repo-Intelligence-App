-- Add commit information to each analysis.
alter table public.analyses
add column if not exists commit_sha text;

-- Replace the previous status constraint.
-- Existing "completed" records become "complete".
alter table public.analyses
drop constraint if exists analyses_status_check;

update public.analyses
set status = 'complete'
where status = 'completed';

alter table public.analyses
add constraint analyses_status_check
check (
  status in (
    'queued',
    'parsing',
    'running',
    'complete',
    'failed',
    'cancelled'
  )
);

-- Remove only the old placeholder demo projects.
-- Their dependent analysis data is removed through the existing FK cascade.
delete from public.projects
where repository_url in (
  'https://github.com/example/actmap-demo',
  'https://github.com/example/actmap-qa-demo'
);

-- Create or update the repositories used by the dashboard scenarios.
with project_map as (
  insert into public.projects (
    organization_id,
    name,
    repository_url,
    provider
  )
  values
    (
      'org_3MFQaFqflIJewXCl9gAyBSwtMej',
      'tailwindlabs/tailwindcss',
      'https://github.com/tailwindlabs/tailwindcss',
      'github'
    ),
    (
      'org_3MFQaFqflIJewXCl9gAyBSwtMej',
      'vercel/next.js',
      'https://github.com/vercel/next.js',
      'github'
    ),
    (
      'org_3MFQaFqflIJewXCl9gAyBSwtMej',
      'shadcn-ui/ui',
      'https://github.com/shadcn-ui/ui',
      'github'
    ),
    (
      'org_3MHATFFyrQpb66ObaDJAwUsZjck',
      'clerk/javascript',
      'https://github.com/clerk/javascript',
      'github'
    ),
    (
      'org_3MHATFFyrQpb66ObaDJAwUsZjck',
      'supabase/supabase-js',
      'https://github.com/supabase/supabase-js',
      'github'
    )
  on conflict (organization_id, repository_url)
  do update set
    name = excluded.name
  returning id, organization_id, repository_url
)

insert into public.analyses (
  organization_id,
  project_id,
  status,
  commit_sha,
  summary,
  error_message,
  started_at,
  completed_at,
  created_at
)
select
  scenarios.organization_id,
  project_map.id,
  scenarios.status,
  scenarios.commit_sha,
  scenarios.summary,
  scenarios.error_message,
  now() - scenarios.started_ago,
  case
    when scenarios.finished_ago is not null
    then now() - scenarios.finished_ago
    else null
  end,
  now() - scenarios.started_ago
from (
  values
    -- Main organization: five analysis scenarios.
    (
      'org_3MFQaFqflIJewj1QEslWlmBqQYnD'::text,
      'https://github.com/tailwindlabs/tailwindcss'::text,
      'queued'::text,
      null::text,
      'Waiting for repository analysis.'::text,
      null::text,
      interval '4 minutes',
      null::interval
    ),
    (
      'org_3MFQaFqflIJewj1QEslWlmBqQYnD',
      'https://github.com/vercel/next.js',
      'parsing',
      'a93be01',
      'Repository files are being parsed.',
      null,
      interval '6 minutes',
      null
    ),
    (
      'org_3MFQaFqflIJewj1QEslWlmBqQYnD',
      'https://github.com/shadcn-ui/ui',
      'failed',
      null,
      'Repository analysis failed.',
      'Repository archive download timed out',
      interval '5 hours',
      interval '5 hours'
    ),
    (
      'org_3MFQaFqflIJewj1QEslWlmBqQYnD',
      'https://github.com/shadcn-ui/ui',
      'complete',
      '0c7d9e2',
      'Repository analysis completed.',
      null,
      interval '24 hours',
      interval '24 hours'
    ),
    (
      'org_3MFQaFqflIJewj1QEslWlmBqQYnD',
      'https://github.com/vercel/next.js',
      'complete',
      '4f1c2a9',
      'Repository analysis completed.',
      null,
      interval '3 days',
      interval '3 days'
    ),

    -- Test organization: two analysis scenarios.
    (
      'org_3MHATFFyrQpb66ObaDJAwUsZjck',
      'https://github.com/clerk/javascript',
      'queued',
      null,
      'Waiting for repository analysis.',
      null,
      interval '3 minutes',
      null
    ),
    (
      'org_3MHATFFyrQpb66ObaDJAwUsZjck',
      'https://github.com/supabase/supabase-js',
      'complete',
      '7bd21f4',
      'Repository analysis completed.',
      null,
      interval '1 day',
      interval '1 day'
    )
) as scenarios (
  organization_id,
  repository_url,
  status,
  commit_sha,
  summary,
  error_message,
  started_ago,
  finished_ago
)
join project_map
  on project_map.organization_id = scenarios.organization_id
 and project_map.repository_url = scenarios.repository_url;