import SocialChart from '../SocialChart';

export default function SocialChartExample() {
  const mockData = {
    labels: ['Trust', 'Participation', 'Collaboration'],
    datasets: [{
      label: 'Community Score',
      data: [3.5, 4.2, 3.8],
      backgroundColor: [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-3))',
        'hsl(var(--chart-4))'
      ]
    }]
  };

  return <SocialChart data={mockData} title="Social Capital Metrics" />;
}