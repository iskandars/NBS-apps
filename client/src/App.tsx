import { useState, useEffect } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import AppSidebar from "@/components/AppSidebar";
import Home from "@/pages/Home";
import Climate from "@/pages/Climate";
import Social from "@/pages/Social";
import Biodiversity from "@/pages/Biodiversity";
import WaterQuality from "@/pages/WaterQuality";
import Carbon from "@/pages/Carbon";
import Alerts from "@/pages/Alerts";
import Projects from "@/pages/Projects";
import Approvals from "@/pages/Approvals";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";
import { Moon, Sun } from 'lucide-react';
import type { UserRole } from '@shared/schema';

function Router({ userRole }: { userRole: UserRole }) {
  return (
    <Switch>
      <Route path="/" component={() => <Home userRole={userRole} username="Dr. Sarah Johnson" />} />
      <Route path="/climate" component={Climate} />
      <Route path="/biodiversity" component={Biodiversity} />
      <Route path="/water" component={WaterQuality} />
      <Route path="/carbon" component={Carbon} />
      <Route path="/social" component={Social} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/projects" component={Projects} />
      <Route path="/approvals" component={Approvals} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [userRole, setUserRole] = useState<UserRole>('supervisor');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  const sidebarStyle = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={sidebarStyle as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar 
              userRole={userRole}
              onRoleChange={handleRoleChange}
              onThemeToggle={handleThemeToggle}
              isDark={isDark}
            />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center gap-2">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <div>
                    <h1 className="font-semibold">NBS Monitoring Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Nature-Based System Analytics</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleThemeToggle}
                  data-testid="button-theme-toggle-header"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </header>
              <main className="flex-1 overflow-auto bg-background">
                <Router userRole={userRole} />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
