import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Leaf, Trees, Sprout, TrendingDown } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import type { CarbonProject } from '@shared/schema';

export default function CarbonPanel() {
  const { data: projects = [], isLoading } = useQuery<CarbonProject[]>({
    queryKey: ['/api/carbon-projects'],
  });

  const totalCaptured = projects.reduce((sum, p) => sum + p.captured, 0);
  const totalTarget = projects.reduce((sum, p) => sum + p.target, 0);
  const totalArea = projects.reduce((sum, p) => sum + p.area, 0);

  const chartData = {
    labels: projects.map(p => p.name),
    datasets: [{
      label: 'Carbon Captured (tonnes CO₂)',
      data: projects.map(p => p.captured),
      backgroundColor: 'hsl(var(--chart-1) / 0.8)',
    }, {
      label: 'Target (tonnes CO₂)',
      data: projects.map(p => p.target),
      backgroundColor: 'hsl(var(--muted))',
    }]
  };

  const typeIcons = {
    reforestation: Trees,
    wetland: Sprout,
    agroforestry: Leaf
  };

  const handleProjectClick = (project: CarbonProject) => {
    console.log(`Project clicked: ${project.name}`);
  };

  if (isLoading) {
    return <div className="p-6 text-center text-muted-foreground">Loading carbon data...</div>;
  }

  return (
    <div className="space-y-6" data-testid="panel-carbon">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Trees className="h-8 w-8 mx-auto text-primary" />
              <div className="text-3xl font-bold text-primary">{totalCaptured.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Tonnes CO₂ Captured</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Leaf className="h-8 w-8 mx-auto text-primary" />
              <div className="text-3xl font-bold">{totalArea.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Hectares Managed</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <TrendingDown className="h-8 w-8 mx-auto text-primary" />
              <div className="text-3xl font-bold">{((totalCaptured / totalTarget) * 100).toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Target Progress</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Sprout className="h-8 w-8 mx-auto text-primary" />
              <div className="text-3xl font-bold">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Carbon Sequestration by Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' }
                }
              }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Project Details</h3>
        {projects.map((project) => {
          const Icon = typeIcons[project.type as keyof typeof typeIcons];
          const progress = (project.captured / project.target) * 100;
          
          return (
            <Card
              key={project.name}
              className="hover-elevate cursor-pointer"
              onClick={() => handleProjectClick(project)}
              data-testid={`project-${project.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground">{project.area} hectares</div>
                      </div>
                    </div>
                    <Badge variant="default">{project.type}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Carbon Sequestration Progress</span>
                      <span className="font-medium">{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{project.captured.toLocaleString()} tonnes captured</span>
                      <span>Target: {project.target.toLocaleString()} tonnes</span>
                    </div>
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