import GrafanaPanel from '@/components/GrafanaPanel';

export default function Approvals() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Approval Flow Metrics</h1>
        <p className="text-muted-foreground">
          Real-time workflow analytics and approval process monitoring through Grafana integration.
        </p>
      </div>
      
      <div className="h-[calc(100vh-200px)]">
        <GrafanaPanel dashboardUrl="https://grafana.nbs.local/d/approval-metrics" />
      </div>
    </div>
  );
}