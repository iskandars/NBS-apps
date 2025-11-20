import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Droplets, ThermometerSun, Gauge, FlaskConical, MapPin } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import type { WaterStation } from '@shared/schema';

export default function WaterQualityPanel() {
  const { data: stations = [], isLoading } = useQuery<WaterStation[]>({
    queryKey: ['/api/water-stations'],
  });

  const [selectedStation, setSelectedStation] = useState('');

  const currentStation = stations.find((s: WaterStation) => s.id === selectedStation) || stations[0];
  
  // Auto-select first station when data loads
  if (stations.length > 0 && !selectedStation) {
    setSelectedStation(stations[0].id);
  }

  const statusConfig = {
    excellent: { variant: 'default' as const, label: 'Excellent', color: 'hsl(var(--chart-1))' },
    good: { variant: 'secondary' as const, label: 'Good', color: 'hsl(var(--chart-2))' },
    fair: { variant: 'outline' as const, label: 'Fair', color: 'hsl(var(--chart-3))' },
    poor: { variant: 'destructive' as const, label: 'Poor', color: 'hsl(var(--destructive))' }
  };

  const chartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [{
      label: 'pH Level',
      data: [7.1, 7.2, 7.3, 7.2, 7.1, 7.2],
      borderColor: 'hsl(var(--chart-1))',
      backgroundColor: 'hsl(var(--chart-1) / 0.1)',
      fill: true
    }]
  };

  const getPhStatus = (ph: number) => {
    if (ph >= 6.5 && ph <= 8.5) return { status: 'optimal', color: 'hsl(var(--chart-1))' };
    if (ph >= 6.0 && ph <= 9.0) return { status: 'acceptable', color: 'hsl(var(--chart-3))' };
    return { status: 'critical', color: 'hsl(var(--destructive))' };
  };

  const handleStationChange = (stationId: string) => {
    setSelectedStation(stationId);
    console.log(`Station changed to: ${stationId}`);
  };

  const handleMetricClick = (metric: string) => {
    console.log(`Metric clicked: ${metric}`);
  };

  const phStatus = getPhStatus(currentStation.ph);

  if (isLoading || !currentStation) {
    return <div className="p-6 text-center text-muted-foreground">Loading water quality data...</div>;
  }

  return (
    <div className="space-y-6" data-testid="panel-water-quality">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <div>
            <div className="font-medium">{currentStation.name}</div>
            <div className="text-sm text-muted-foreground">{currentStation.location}</div>
          </div>
        </div>
        
        <Select value={selectedStation} onValueChange={handleStationChange}>
          <SelectTrigger className="w-64" data-testid="select-station">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {stations.map(station => (
              <SelectItem key={station.id} value={station.id}>
                {station.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between p-4 bg-muted/30 border rounded-md">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-primary" />
          <span className="font-medium">Overall Water Quality:</span>
        </div>
        <Badge variant={statusConfig[currentStation.status as keyof typeof statusConfig].variant} className="text-sm">
          {statusConfig[currentStation.status as keyof typeof statusConfig].label}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          className="hover-elevate cursor-pointer"
          onClick={() => handleMetricClick('pH')}
          data-testid="metric-ph"
        >
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FlaskConical className="h-5 w-5 text-muted-foreground" />
                <Badge variant="outline" className="text-xs">{phStatus.status}</Badge>
              </div>
              <div>
                <div className="text-3xl font-bold">{currentStation.ph}</div>
                <div className="text-sm text-muted-foreground">pH Level</div>
              </div>
              <Progress value={(currentStation.ph / 14) * 100} className="h-1" />
              <div className="text-xs text-muted-foreground">Optimal: 6.5-8.5</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover-elevate cursor-pointer"
          onClick={() => handleMetricClick('Turbidity')}
          data-testid="metric-turbidity"
        >
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Gauge className="h-5 w-5 text-muted-foreground" />
                <Badge variant="secondary" className="text-xs">NTU</Badge>
              </div>
              <div>
                <div className="text-3xl font-bold">{currentStation.turbidity}</div>
                <div className="text-sm text-muted-foreground">Turbidity</div>
              </div>
              <Progress value={(currentStation.turbidity / 100) * 100} className="h-1" />
              <div className="text-xs text-muted-foreground">Target: &lt;25 NTU</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover-elevate cursor-pointer"
          onClick={() => handleMetricClick('Temperature')}
          data-testid="metric-temperature"
        >
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <ThermometerSun className="h-5 w-5 text-muted-foreground" />
                <Badge variant="secondary" className="text-xs">°C</Badge>
              </div>
              <div>
                <div className="text-3xl font-bold">{currentStation.temperature}</div>
                <div className="text-sm text-muted-foreground">Temperature</div>
              </div>
              <Progress value={(currentStation.temperature / 40) * 100} className="h-1" />
              <div className="text-xs text-muted-foreground">Range: 20-30°C</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover-elevate cursor-pointer"
          onClick={() => handleMetricClick('Dissolved Oxygen')}
          data-testid="metric-oxygen"
        >
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Droplets className="h-5 w-5 text-muted-foreground" />
                <Badge variant="default" className="text-xs">mg/L</Badge>
              </div>
              <div>
                <div className="text-3xl font-bold">{currentStation.dissolvedOxygen}</div>
                <div className="text-sm text-muted-foreground">Dissolved O₂</div>
              </div>
              <Progress value={(currentStation.dissolvedOxygen / 12) * 100} className="h-1" />
              <div className="text-xs text-muted-foreground">Minimum: 5 mg/L</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>24-Hour pH Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line 
              data={chartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: { min: 6, max: 8 }
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}