import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, Database, Key, Shield, Globe } from 'lucide-react';

export default function Settings() {
  const handleSettingClick = (setting: string) => {
    console.log(`Settings clicked: ${setting}`);
  };

  //todo: remove mock functionality - replace with real system configuration
  const systemSettings = [
    {
      title: 'Database Configuration',
      description: 'PostgreSQL connection and data retention policies',
      icon: Database,
      status: 'Connected',
      variant: 'default' as const
    },
    {
      title: 'API Keys Management', 
      description: 'External service integrations and authentication',
      icon: Key,
      status: 'Active',
      variant: 'default' as const
    },
    {
      title: 'User Permissions',
      description: 'Role-based access control and user management',
      icon: Shield,
      status: 'Configured',
      variant: 'secondary' as const
    },
    {
      title: 'GeoServer Integration',
      description: 'Spatial data services and WMS layer configuration',
      icon: Globe,
      status: 'Testing',
      variant: 'outline' as const
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">
          Administrative controls and system configuration for the NBS monitoring platform.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {systemSettings.map((setting, index) => {
          const Icon = setting.icon;
          return (
            <Card key={setting.title} className="hover-elevate cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{setting.title}</CardTitle>
                </div>
                <Badge variant={setting.variant}>{setting.status}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{setting.description}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSettingClick(setting.title)}
                  data-testid={`button-${setting.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Configure
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-primary">1.2TB</div>
              <div className="text-sm text-muted-foreground">Data Stored</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>
          
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Last system maintenance: 2 hours ago • Next scheduled: Tomorrow 2:00 AM
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}