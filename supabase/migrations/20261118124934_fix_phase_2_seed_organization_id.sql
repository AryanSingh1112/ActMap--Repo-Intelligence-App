-- Fix the five missing Phase 2 demo analyses for Aryan's organization.

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
  'org_3MFQaFqflIJewXCl9gAyBSwtMej',
  projects.id,
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
    (
      'https://github.com/tailwindlabs/tailwindcss',
      'queued',
      null::text,
      'Waiting for repository analysis.',
      null::text,
      interval '4 minutes',
      null::interval
    ),
    (
      'https://github.com/vercel/next.js',
      'parsing',
      'a93be01',
      'Repository files are being parsed.',
      null::text,
      interval '6 minutes',
      null::interval
    ),
    (
      'https://github.com/shadcn-ui/ui',
      'failed',
      null::text,
      'Repository analysis failed.',
      'Repository archive download timed out',
      interval '5 hours',
      interval '5 hours'
    ),
    (
      'https://github.com/shadcn-ui/ui',
      'complete',
      '0c7d9e2',
      'Repository analysis completed.',
      null::text,
      interval '24 hours',
      interval '24 hours'
    ),
    (
      'https://github.com/vercel/next.js',
      'complete',
      '4f1c2a9',
      'Repository analysis completed.',
      null::text,
      interval '3 days',
      interval '3 days'
    )
) as scenarios (
  repository_url,
  status,
  commit_sha,
  summary,
  error_message,
  started_ago,
  finished_ago
)
join public.projects projects
  on projects.organization_id = 'org_3MFQaFqflIJewXCl9gAyBSwtMej'
 and projects.repository_url = scenarios.repository_url
where not exists (
  select 1
  from public.analyses existing
  where existing.organization_id = 'org_3MFQaFqflIJewXCl9gAyBSwtMej'
    and existing.project_id = projects.id
    and existing.summary = scenarios.summary
);