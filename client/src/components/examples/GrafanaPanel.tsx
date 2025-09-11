import GrafanaPanel from '../GrafanaPanel';

export default function GrafanaPanelExample() {
  return (
    <div className="h-96">
      <GrafanaPanel dashboardUrl="https://grafana.nbs.local/d/approval-metrics" />
    </div>
  );
}