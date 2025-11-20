import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bird, Bug, Fish, Flower2, AlertTriangle, TrendingUp } from 'lucide-react';
import type { Species } from '@shared/schema';

export default function BiodiversityPanel() {
  const [selectedCategory, setSelectedCategory] = useState<'birds' | 'insects' | 'aquatic' | 'plants'>('birds');

  const { data: species = [], isLoading } = useQuery<Species[]>({
    queryKey: ['/api/species'],
  });

  const filteredSpecies = species.filter((s: Species) => s.category === selectedCategory);

  const statusConfig = {
    endangered: { variant: 'destructive' as const, color: 'hsl(var(--destructive))' },
    vulnerable: { variant: 'outline' as const, color: 'hsl(var(--chart-3))' },
    stable: { variant: 'secondary' as const, color: 'hsl(var(--chart-2))' },
    thriving: { variant: 'default' as const, color: 'hsl(var(--chart-1))' }
  };

  const categoryIcons = {
    birds: Bird,
    insects: Bug,
    aquatic: Fish,
    plants: Flower2
  };

  const totalSpecies = species.length;
  const endangeredCount = species.filter(s => s.status === 'endangered').length;
  const biodiversityIndex = ((totalSpecies - endangeredCount) / totalSpecies) * 100;

  const handleSpeciesClick = (species: Species) => {
    console.log(`Species clicked: ${species.name}`);
  };

  if (isLoading) {
    return <div className="p-6 text-center text-muted-foreground">Loading biodiversity data...</div>;
  }

  return (
    <div className="space-y-6" data-testid="panel-biodiversity">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{totalSpecies}</div>
              <div className="text-sm text-muted-foreground">Species Monitored</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-destructive">{endangeredCount}</div>
              <div className="text-sm text-muted-foreground">Endangered</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{biodiversityIndex.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Health Index</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div className="text-3xl font-bold text-primary">+12%</div>
              </div>
              <div className="text-sm text-muted-foreground">This Quarter</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Species Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
            <TabsList className="grid w-full grid-cols-4">
              {Object.entries(categoryIcons).map(([key, Icon]) => (
                <TabsTrigger key={key} value={key} data-testid={`tab-${key}`}>
                  <Icon className="h-4 w-4 mr-2" />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={selectedCategory} className="space-y-4 mt-4">
              {filteredSpecies.map((sp) => {
                const Icon = categoryIcons[sp.category as keyof typeof categoryIcons];
                const config = statusConfig[sp.status as keyof typeof statusConfig];
                
                return (
                  <div
                    key={sp.scientificName}
                    className="flex items-center justify-between p-3 border rounded-md hover-elevate cursor-pointer"
                    onClick={() => handleSpeciesClick(sp)}
                    data-testid={`species-${sp.scientificName.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{sp.name}</div>
                        <div className="text-xs text-muted-foreground italic">{sp.scientificName}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-medium">{sp.count} observed</div>
                        <Badge variant={config.variant} className="text-xs">
                          {sp.status}
                        </Badge>
                      </div>
                      <div className="text-2xl">
                        {sp.trend === 'up' ? '↗' : sp.trend === 'down' ? '↘' : '→'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Conservation Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
              <div className="space-y-1">
                <div className="text-sm font-medium">Rafflesia population declining</div>
                <div className="text-xs text-muted-foreground">
                  33% decrease in sightings over the past month. Habitat protection required.
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-muted/50 border rounded-md">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
              <div className="space-y-1">
                <div className="text-sm font-medium">Freshwater ecosystem recovering</div>
                <div className="text-xs text-muted-foreground">
                  Aquatic species showing positive trends due to water management initiatives.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}