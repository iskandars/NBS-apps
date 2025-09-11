import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Activity, AlertCircle, CheckCircle } from 'lucide-react';

interface GrafanaPanelProps {
  dashboardUrl?: string;
}

export default function GrafanaPanel({ dashboardUrl = "https://grafana.nbs.local/d/approval-metrics" }: GrafanaPanelProps) {
  //todo: remove mock functionality - replace with real Grafana integration
  const mockMetrics = [
    { label: 'Pending Approvals', value: 12, trend: 'up', icon: AlertCircle, variant: 'destructive' as const },
    { label: 'Approved Today', value: 34, trend: 'up', icon: CheckCircle, variant: 'default' as const },
    { label: 'Processing Time', value: '2.4h', trend: 'down', icon: Activity, variant: 'secondary' as const },
    { label: 'Success Rate', value: '94.2%', trend: 'up', icon: TrendingUp, variant: 'default' as const }
  ];

  const handleMetricClick = (metric: string) => {
    console.log(`Clicked metric: ${metric}`);
  };

  return (
    <Card className="h-full" data-testid="panel-grafana">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Approval Flow Metrics</CardTitle>
        </div>
        <Badge variant="outline" className="text-xs">
          Live Dashboard
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {mockMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div 
                key={metric.label}
                className="p-3 border rounded-md hover-elevate cursor-pointer transition-all"
                onClick={() => handleMetricClick(metric.label)}
                data-testid={`metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <Badge variant={metric.variant} className="text-xs">
                    {metric.trend === 'up' ? '↑' : '↓'}
                  </Badge>
                </div>
                <div className="text-lg font-semibold">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            );
          })}
        </div>
        
        <div className="h-48 border rounded-md bg-muted/20 relative overflow-hidden">
          <div className="absolute inset-4 border-2 border-dashed border-muted-foreground/20 rounded flex items-center justify-center">
            <div className="text-center space-y-2">
              <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                Grafana Dashboard Embed
              </div>
              <div className="text-xs text-muted-foreground">
                {dashboardUrl}
              </div>
              <div className="text-xs text-muted-foreground italic">
                Mock visualization for prototype
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          Real-time approval workflow metrics powered by Grafana
        </div>
      </CardContent>
    </Card>
  );
}