import ClimatePanel from '../ClimatePanel';

export default function ClimatePanelExample() {
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

  return (
    <div className="h-96">
      <ClimatePanel data={mockData} />
    </div>
  );
}