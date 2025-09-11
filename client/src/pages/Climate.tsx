import ClimatePanel from '@/components/ClimatePanel';
import type { ClimateChartData } from '@shared/schema';

export default function Climate() {
  //todo: remove mock functionality - replace with real API calls
  const climateData: ClimateChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Rainfall (mm)',
      data: [120, 80, 150, 100, 180, 140, 95, 110, 160, 130, 170, 145],
      borderColor: 'hsl(var(--chart-2))',
      backgroundColor: 'hsl(var(--chart-2) / 0.1)',
      fill: true
    }]
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Climate Data Monitoring</h1>
        <p className="text-muted-foreground">
          Comprehensive environmental indicators and geospatial analysis for nature-based systems.
        </p>
      </div>
      
      <div className="h-[calc(100vh-200px)]">
        <ClimatePanel data={climateData} />
      </div>
    </div>
  );
}