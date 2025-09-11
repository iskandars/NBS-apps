import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '../AppSidebar';
import type { UserRole } from '@shared/schema';

export default function AppSidebarExample() {
  const [userRole, setUserRole] = useState<UserRole>('supervisor');
  const [isDark, setIsDark] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    console.log(`Role changed to: ${role}`);
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    console.log(`Theme toggled to: ${!isDark ? 'dark' : 'light'}`);
  };

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-64 w-full">
        <AppSidebar 
          userRole={userRole} 
          onRoleChange={handleRoleChange} 
          onThemeToggle={handleThemeToggle}
          isDark={isDark}
        />
        <div className="flex-1 p-4 border bg-muted/10">
          <div className="text-center text-muted-foreground">
            Main content area - Role: {userRole}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}