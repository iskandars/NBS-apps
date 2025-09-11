import SocialCapitalPanel from '@/components/SocialCapitalPanel';
import type { SocialChartData } from '@shared/schema';

export default function Social() {
  //todo: remove mock functionality - replace with real KoboToolbox API integration
  const socialData: SocialChartData = {
    labels: ['Trust', 'Participation', 'Collaboration', 'Leadership', 'Communication'],
    datasets: [{
      label: 'Community Score',
      data: [3.5, 4.2, 3.8, 3.9, 4.1],
      backgroundColor: [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))',
        'hsl(var(--chart-4))',
        'hsl(var(--chart-5))'
      ]
    }]
  };

  const insights = [
    "Village A: High participation in reforestation initiatives with 85% community involvement",
    "Village B: Moderate trust in local governance systems, improving through transparency measures", 
    "Village C: Strong collaboration in water management projects, leading to 40% efficiency gains",
    "District D: Increased community engagement in conservation efforts since last quarter",
    "Region E: Growing social capital through education programs and capacity building",
    "Zone F: Leadership development programs showing positive impact on local decision-making",
    "Area G: Communication networks strengthened through digital inclusion initiatives"
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Social Capital Metrics</h1>
        <p className="text-muted-foreground">
          Community engagement indicators and social network analysis from field surveys.
        </p>
      </div>
      
      <div className="h-[calc(100vh-200px)]">
        <SocialCapitalPanel data={socialData} insights={insights} />
      </div>
    </div>
  );
}