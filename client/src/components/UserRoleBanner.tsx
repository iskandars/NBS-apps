import { Badge } from '@/components/ui/badge';
import { User, Shield, Settings, Crown } from 'lucide-react';
import type { UserRole } from '@shared/schema';

interface UserRoleBannerProps {
  role: UserRole;
  username: string;
}

const roleConfig = {
  operator: {
    label: 'Operator',
    icon: User,
    variant: 'secondary' as const,
    description: 'Basic monitoring access'
  },
  supervisor: {
    label: 'Supervisor',
    icon: Shield,
    variant: 'default' as const,
    description: 'Enhanced monitoring & analysis'
  },
  clientadmin: {
    label: 'Client Admin',
    icon: Settings,
    variant: 'outline' as const,
    description: 'User management & reporting'
  },
  sysadmin: {
    label: 'System Admin',
    icon: Crown,
    variant: 'destructive' as const,
    description: 'Full system access'
  }
};

export default function UserRoleBanner({ role, username }: UserRoleBannerProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <div className="flex items-center justify-between p-4 bg-muted/30 border-b" data-testid="user-role-banner">
      <div className="flex items-center gap-3">
        <div className="text-sm text-muted-foreground">
          Logged in as:
        </div>
        <Badge variant={config.variant} className="gap-2" data-testid={`badge-role-${role}`}>
          <Icon className="h-3 w-3" />
          {username}
        </Badge>
      </div>
      
      <div className="text-right">
        <div className="text-sm font-medium">{config.label}</div>
        <div className="text-xs text-muted-foreground">{config.description}</div>
      </div>
    </div>
  );
}