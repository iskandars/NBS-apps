import ProjectsPanel from '@/components/ProjectsPanel';

export default function Projects() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Project Management</h1>
        <p className="text-muted-foreground">
          Track NBS implementation projects, budgets, timelines, and team resources across all conservation initiatives.
        </p>
      </div>
      
      <ProjectsPanel />
    </div>
  );
}