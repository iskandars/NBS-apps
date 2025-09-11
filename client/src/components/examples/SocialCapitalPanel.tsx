import SocialCapitalPanel from '../SocialCapitalPanel';

export default function SocialCapitalPanelExample() {
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

  const mockInsights = [
    "Village A: High participation in reforestation initiatives",
    "Village B: Moderate trust in local governance systems",
    "Village C: Strong collaboration in water management projects",
    "District D: Increased community engagement in conservation",
    "Region E: Growing social capital through education programs"
  ];

  return (
    <div className="h-96">
      <SocialCapitalPanel data={mockData} insights={mockInsights} />
    </div>
  );
}