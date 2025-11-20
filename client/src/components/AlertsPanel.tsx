import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  Bell,
  Droplets,
  ThermometerSun,
  Wind,
  TreePine
} from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  category: 'environment' | 'biodiversity' | 'water' | 'weather';
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

export default function AlertsPanel() {
  //todo: remove mock functionality - replace with real alert system API
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'High Turbidity Detected',
      description: 'Water turbidity at Downstream Station exceeds 50 NTU threshold',
      severity: 'critical',
      category: 'water',
      timestamp: '2 hours ago',
      status: 'active'
    },
    {
      id: '2',
      title: 'Temperature Spike Warning',
      description: 'River temperature increased by 3°C in 6 hours',
      severity: 'warning',
      category: 'environment',
      timestamp: '5 hours ago',
      status: 'acknowledged'
    },
    {
      id: '3',
      title: 'Endangered Species Sighting',
      description: 'Javan Hawk-Eagle spotted in protected area - positive indicator',
      severity: 'info',
      category: 'biodiversity',
      timestamp: '1 day ago',
      status: 'resolved'
    },
    {
      id: '4',
      title: 'Heavy Rainfall Expected',
      description: 'Weather forecast indicates 120mm+ rainfall in next 48 hours',
      severity: 'warning',
      category: 'weather',
      timestamp: '3 hours ago',
      status: 'active'
    },
    {
      id: '5',
      title: 'Dissolved Oxygen Below Minimum',
      description: 'DO levels at 4.2 mg/L, below safe threshold of 5 mg/L',
      severity: 'critical',
      category: 'water',
      timestamp: '30 minutes ago',
      status: 'active'
    }
  ]);

  const severityConfig = {
    critical: {
      variant: 'destructive' as const,
      icon: AlertTriangle,
      color: 'hsl(var(--destructive))',
      bg: 'bg-destructive/10 border-destructive/20'
    },
    warning: {
      variant: 'outline' as const,
      icon: AlertCircle,
      color: 'hsl(var(--chart-3))',
      bg: 'bg-yellow-500/10 border-yellow-500/20'
    },
    info: {
      variant: 'secondary' as const,
      icon: Info,
      color: 'hsl(var(--chart-2))',
      bg: 'bg-blue-500/10 border-blue-500/20'
    }
  };

  const categoryIcons = {
    environment: TreePine,
    biodiversity: TreePine,
    water: Droplets,
    weather: Wind
  };

  const activeAlerts = alerts.filter(a => a.status === 'active');
  const acknowledgedAlerts = alerts.filter(a => a.status === 'acknowledged');
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved');

  const handleAlertClick = (alert: Alert) => {
    console.log(`Alert clicked: ${alert.id}`);
  };

  const handleAcknowledge = (alertId: string) => {
    console.log(`Alert acknowledged: ${alertId}`);
  };

  const handleResolve = (alertId: string) => {
    console.log(`Alert resolved: ${alertId}`);
  };

  const renderAlert = (alert: Alert) => {
    const config = severityConfig[alert.severity];
    const SeverityIcon = config.icon;
    const CategoryIcon = categoryIcons[alert.category];

    return (
      <Card
        key={alert.id}
        className={`hover-elevate cursor-pointer ${config.bg} border`}
        onClick={() => handleAlertClick(alert)}
        data-testid={`alert-${alert.id}`}
      >
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <SeverityIcon className="h-5 w-5 mt-0.5" style={{ color: config.color }} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{alert.title}</div>
                    <CategoryIcon className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground">{alert.description}</div>
                  <div className="text-xs text-muted-foreground">{alert.timestamp}</div>
                </div>
              </div>
              <Badge variant={config.variant} className="text-xs">
                {alert.severity}
              </Badge>
            </div>
            
            {alert.status === 'active' && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAcknowledge(alert.id);
                  }}
                  data-testid={`button-acknowledge-${alert.id}`}
                >
                  Acknowledge
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResolve(alert.id);
                  }}
                  data-testid={`button-resolve-${alert.id}`}
                >
                  Resolve
                </Button>
              </div>
            )}
            
            {alert.status === 'acknowledged' && (
              <Badge variant="secondary" className="text-xs">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Acknowledged
              </Badge>
            )}
            
            {alert.status === 'resolved' && (
              <Badge variant="default" className="text-xs">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Resolved
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6" data-testid="panel-alerts">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <AlertTriangle className="h-8 w-8 mx-auto text-destructive" />
              <div className="text-3xl font-bold text-destructive">{activeAlerts.length}</div>
              <div className="text-sm text-muted-foreground">Active Alerts</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <AlertCircle className="h-8 w-8 mx-auto text-primary" />
              <div className="text-3xl font-bold">{acknowledgedAlerts.length}</div>
              <div className="text-sm text-muted-foreground">Acknowledged</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 mx-auto text-primary" />
              <div className="text-3xl font-bold">{resolvedAlerts.length}</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Environmental Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active" data-testid="tab-active">
                Active ({activeAlerts.length})
              </TabsTrigger>
              <TabsTrigger value="acknowledged" data-testid="tab-acknowledged">
                Acknowledged ({acknowledgedAlerts.length})
              </TabsTrigger>
              <TabsTrigger value="resolved" data-testid="tab-resolved">
                Resolved ({resolvedAlerts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4 mt-4">
              {activeAlerts.length > 0 ? (
                activeAlerts.map(renderAlert)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No active alerts
                </div>
              )}
            </TabsContent>

            <TabsContent value="acknowledged" className="space-y-4 mt-4">
              {acknowledgedAlerts.length > 0 ? (
                acknowledgedAlerts.map(renderAlert)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No acknowledged alerts
                </div>
              )}
            </TabsContent>

            <TabsContent value="resolved" className="space-y-4 mt-4">
              {resolvedAlerts.length > 0 ? (
                resolvedAlerts.map(renderAlert)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No resolved alerts
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}