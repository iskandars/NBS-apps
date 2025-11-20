import { useState, useEffect } from 'react';
import UserRoleBanner from './UserRoleBanner';
import ClimatePanel from './ClimatePanel';
import SocialCapitalPanel from './SocialCapitalPanel';
import GrafanaPanel from './GrafanaPanel';
import type { UserRole, ClimateChartData, SocialChartData } from '@shared/schema';

interface DashboardProps {
  userRole: UserRole;
  username: string;
}

const rolePermissions = {
  operator: ['climate', 'biodiversity', 'water', 'alerts'],
  supervisor: ['climate', 'social', 'biodiversity', 'water', 'carbon', 'alerts'],
  clientadmin: ['climate', 'social', 'biodiversity', 'water', 'carbon', 'alerts', 'grafana', 'projects'],
  sysadmin: ['climate', 'social', 'biodiversity', 'water', 'carbon', 'alerts', 'grafana', 'projects']
};

export default function Dashboard({ userRole, username }: DashboardProps) {
  const [climateData] = useState<ClimateChartData>({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Rainfall (mm)',
      data: [120, 80, 150, 100, 180, 140],
      borderColor: 'hsl(var(--chart-2))',
      backgroundColor: 'hsl(var(--chart-2) / 0.1)',
      fill: true
    }]
  });

  const [socialData] = useState<SocialChartData>({
    labels: ['Trust', 'Participation', 'Collaboration'],
    datasets: [{
      label: 'Community Score',
      data: [3.5, 4.2, 3.8],
      backgroundColor: [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-3))',
        'hsl(var(--chart-4))'
      ]
    }]
  });

  const [insights] = useState([
    "Village A: High participation in reforestation initiatives with 85% community involvement",
    "Village B: Moderate trust in local governance systems, improving through transparency measures",
    "Village C: Strong collaboration in water management projects, leading to 40% efficiency gains",
    "District D: Increased community engagement in conservation efforts since last quarter",
    "Region E: Growing social capital through education programs and capacity building"
  ]);

  const allowedPanels = rolePermissions[userRole] || [];

  //todo: remove mock functionality - replace with real API calls
  useEffect(() => {
    console.log(`Dashboard loaded for ${userRole}: ${username}`);
  }, [userRole, username]);

  return (
    <div className="space-y-6" data-testid="dashboard">
      <UserRoleBanner role={userRole} username={username} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {allowedPanels.includes('climate') && (
          <div className="lg:row-span-2">
            <ClimatePanel data={climateData} />
          </div>
        )}
        
        {allowedPanels.includes('social') && (
          <div className="lg:row-span-2">
            <SocialCapitalPanel data={socialData} insights={insights} />
          </div>
        )}
        
        {allowedPanels.includes('grafana') && (
          <div className="lg:col-span-2">
            <GrafanaPanel />
          </div>
        )}
      </div>
      
      {allowedPanels.length === 0 && (
        <div className="flex items-center justify-center h-64" data-testid="no-access">
          <div className="text-center">
            <div className="text-lg font-medium text-muted-foreground">No Access</div>
            <div className="text-sm text-muted-foreground">
              Your current role ({userRole}) doesn't have permission to view any panels.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}