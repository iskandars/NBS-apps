import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import type { UserRole } from '@shared/schema';

interface HomeProps {
  userRole: UserRole;
  username: string;
}

export default function Home({ userRole = 'supervisor', username = 'Dr. Sarah Johnson' }: HomeProps) {
  return (
    <div className="min-h-screen bg-background">
      <Dashboard userRole={userRole} username={username} />
    </div>
  );
}