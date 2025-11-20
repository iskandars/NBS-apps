import AlertsPanel from '@/components/AlertsPanel';

export default function Alerts() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Environmental Alerts</h1>
        <p className="text-muted-foreground">
          Real-time monitoring and notification system for environmental thresholds, critical conditions, and system alerts.
        </p>
      </div>
      
      <AlertsPanel />
    </div>
  );
}