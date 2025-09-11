import ClimateChart from '../ClimateChart';

export default function ClimateChartExample() {
  const mockData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{
      label: 'Rainfall (mm)',
      data: [120, 80, 150, 100],
      borderColor: 'hsl(var(--chart-2))',
      backgroundColor: 'hsl(var(--chart-2) / 0.1)',
      fill: true
    }]
  };

  return <ClimateChart data={mockData} title="Monthly Rainfall" />;
}