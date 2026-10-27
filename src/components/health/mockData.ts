export type Status = "healthy" | "attention" | "stale";

export interface Workflow {
  id: string;
  name: string;
  status: Status;
  lastRun: string;
  runCount: number;
  source: string;
  destination: string;
  owner: string;
  errorRate: number;
}

export const STATUS_LABEL: Record<Status, string> = {
  healthy: "Healthy",
  attention: "Needs Attention",
  stale: "Stale",
};

export const workflows: Workflow[] = [
  { id: "wf-001", name: "Shopify to HubSpot Sync", status: "healthy", lastRun: "2026-10-27 13:52 UTC", runCount: 14823, source: "shopify.orders", destination: "hubspot.deals", owner: "revops", errorRate: 0.002 },
  { id: "wf-002", name: "Canvas Deadline Aggregator", status: "healthy", lastRun: "2026-10-27 13:40 UTC", runCount: 6311, source: "canvas.assignments", destination: "notion.calendar", owner: "edtech", errorRate: 0.004 },
  { id: "wf-003", name: "Multi-Tenant Payment Notifications", status: "attention", lastRun: "2026-10-27 09:15 UTC", runCount: 22904, source: "stripe.events", destination: "sendgrid.mail", owner: "billing", errorRate: 0.087 },
  { id: "wf-004", name: "Zendesk Ticket Escalation", status: "stale", lastRun: "2026-10-19 22:04 UTC", runCount: 3120, source: "zendesk.tickets", destination: "pagerduty.incidents", owner: "support", errorRate: 0.0 },
  { id: "wf-005", name: "Salesforce Lead Enrichment", status: "stale", lastRun: "2026-10-14 06:30 UTC", runCount: 8841, source: "salesforce.leads", destination: "clearbit.enrich", owner: "growth", errorRate: 0.0 },
  { id: "wf-006", name: "QuickBooks Invoice Export", status: "stale", lastRun: "2026-10-11 18:12 UTC", runCount: 1502, source: "quickbooks.invoices", destination: "s3.archive", owner: "finance", errorRate: 0.0 },
  { id: "wf-007", name: "Airtable Inventory Mirror", status: "stale", lastRun: "2026-10-08 03:45 UTC", runCount: 9920, source: "airtable.inventory", destination: "postgres.stock", owner: "ops", errorRate: 0.0 },
  { id: "wf-008", name: "Intercom NPS Rollup", status: "stale", lastRun: "2026-10-02 11:00 UTC", runCount: 412, source: "intercom.surveys", destination: "looker.dataset", owner: "cx", errorRate: 0.0 },
  { id: "wf-009", name: "GitHub Release Changelog", status: "stale", lastRun: "2026-09-28 16:20 UTC", runCount: 274, source: "github.releases", destination: "slack.channel", owner: "platform", errorRate: 0.0 },
];
