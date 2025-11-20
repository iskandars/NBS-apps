import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  FolderKanban, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle2,
  Circle,
  PlayCircle
} from 'lucide-react';
import type { Project } from '@shared/schema';

export default function ProjectsPanel() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const statusConfig = {
    planning: {
      variant: 'outline' as const,
      icon: Circle,
      label: 'Planning',
      color: 'hsl(var(--muted-foreground))'
    },
    'in-progress': {
      variant: 'secondary' as const,
      icon: PlayCircle,
      label: 'In Progress',
      color: 'hsl(var(--chart-2))'
    },
    completed: {
      variant: 'default' as const,
      icon: CheckCircle2,
      label: 'Completed',
      color: 'hsl(var(--chart-1))'
    }
  };

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const activeProjects = projects.filter(p => p.status === 'in-progress').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;

  const handleProjectClick = (project: Project) => {
    console.log(`Project clicked: ${project.name}`);
  };

  const handleViewDetails = (projectId: string) => {
    console.log(`View details for project: ${projectId}`);
  };

  if (isLoading) {
    return <div className="p-6 text-center text-muted-foreground">Loading projects...</div>;
  }

  return (
    <div className="space-y-6" data-testid="panel-projects">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <FolderKanban className="h-8 w-8 mx-auto text-primary" />
              <div className="text-3xl font-bold">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <PlayCircle className="h-8 w-8 mx-auto text-primary" />
              <div className="text-3xl font-bold text-primary">{activeProjects}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <DollarSign className="h-8 w-8 mx-auto text-primary" />
              <div className="text-3xl font-bold">${(totalSpent / 1000).toFixed(0)}K</div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 mx-auto text-primary" />
              <div className="text-3xl font-bold text-primary">{completedProjects}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Active Projects</h3>
          <Badge variant="secondary">{projects.length} projects</Badge>
        </div>

        {projects.map((project) => {
          const config = statusConfig[project.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;
          const budgetProgress = (project.spent / project.budget) * 100;

          return (
            <Card
              key={project.id}
              className="hover-elevate cursor-pointer"
              onClick={() => handleProjectClick(project)}
              data-testid={`project-${project.id}`}
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{project.name}</h4>
                        <Badge variant={config.variant} className="text-xs">
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Timeline</div>
                        <div className="font-medium">{project.startDate} - {project.endDate}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Budget</div>
                        <div className="font-medium">${(project.budget / 1000).toFixed(0)}K</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Team Size</div>
                        <div className="font-medium">{project.team} members</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FolderKanban className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Category</div>
                        <div className="font-medium capitalize">{project.category}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Project Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Budget Utilization</span>
                      <span className="font-medium">{budgetProgress.toFixed(0)}%</span>
                    </div>
                    <Progress value={budgetProgress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>${(project.spent / 1000).toFixed(0)}K spent</span>
                      <span>${((project.budget - project.spent) / 1000).toFixed(0)}K remaining</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(project.id);
                      }}
                      data-testid={`button-details-${project.id}`}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}