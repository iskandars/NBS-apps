import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TreePine, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Settings, 
  Shield, 
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import type { UserRole } from '@shared/schema';

interface AppSidebarProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onThemeToggle: () => void;
  isDark: boolean;
}

const rolePermissions = {
  operator: ['climate'],
  supervisor: ['climate', 'social'],
  clientadmin: ['climate', 'social', 'grafana'],
  sysadmin: ['climate', 'social', 'grafana', 'settings']
};

const menuItems = [
  {
    id: 'climate',
    title: 'Climate Data',
    url: '/climate',
    icon: TreePine,
    description: 'Monitor environmental indicators'
  },
  {
    id: 'social',
    title: 'Social Capital',
    url: '/social',
    icon: Users,
    description: 'Community engagement metrics'
  },
  {
    id: 'grafana',
    title: 'Approval Metrics',
    url: '/approvals',
    icon: TrendingUp,
    description: 'Workflow analytics dashboard'
  },
  {
    id: 'settings',
    title: 'System Settings',
    url: '/settings',
    icon: Settings,
    description: 'Administrative controls'
  }
];

export default function AppSidebar({ userRole, onRoleChange, onThemeToggle, isDark }: AppSidebarProps) {
  const [location] = useLocation();
  
  const allowedItems = menuItems.filter(item => 
    rolePermissions[userRole].includes(item.id)
  );

  const handleRoleSwitch = (role: UserRole) => {
    onRoleChange(role);
    console.log(`Role switched to: ${role}`);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <Sidebar data-testid="app-sidebar">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <TreePine className="h-6 w-6 text-primary" />
          <div>
            <div className="font-semibold text-sm">NBS Dashboard</div>
            <div className="text-xs text-muted-foreground">Nature-Based Systems</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allowedItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.url;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      asChild
                      isActive={isActive}
                      data-testid={`nav-${item.id}`}
                    >
                      <Link href={item.url}>
                        <Icon className="h-4 w-4" />
                        <div className="flex flex-col">
                          <span className="text-sm">{item.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Role Testing</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 space-y-1">
              {(['operator', 'supervisor', 'clientadmin', 'sysadmin'] as UserRole[]).map((role) => (
                <Button
                  key={role}
                  variant={role === userRole ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => handleRoleSwitch(role)}
                  data-testid={`button-role-${role}`}
                >
                  <Shield className="h-3 w-3 mr-2" />
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onThemeToggle}
          className="w-full justify-start"
          data-testid="button-theme-toggle"
        >
          {isDark ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          className="w-full justify-start text-destructive hover:text-destructive"
          data-testid="button-logout"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}