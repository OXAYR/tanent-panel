const STATUS_LABELS = {
  0: 'Pending',
  1: 'Active',
  2: 'Suspended',
};

const PLAN_LABELS = {
  0: 'Free',
  1: 'Starter',
  2: 'Business',
  3: 'Enterprise',
};

function formatTenantStatus(status) {
  if (status == null || status === '') return 'Unknown';
  const key = String(status);
  return STATUS_LABELS[key] ?? STATUS_LABELS[Number(key)] ?? key;
}

function formatTenantPlan(plan) {
  if (plan == null || plan === '') return '—';
  const key = String(plan);
  return PLAN_LABELS[key] ?? PLAN_LABELS[Number(key)] ?? `Plan ${key}`;
}

function formatCreatedAt(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

export function mapTenantToListRow(tenant) {
  const id = tenant?.uuid ?? tenant?.id ?? null;
  const name = tenant?.name ?? '—';

  return {
    id,
    name,
    status: formatTenantStatus(tenant?.status),
    plan: formatTenantPlan(tenant?.plan),
    brand_name: tenant?.brand_name ?? '—',
    domain: tenant?.domain ?? '—',
    date: formatCreatedAt(tenant?.created_at ?? tenant?.createdAt),
  };
}
