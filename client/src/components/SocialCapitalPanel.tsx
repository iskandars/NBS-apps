import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SocialChart from './SocialChart';
import { HandHeart, Users, Handshake } from 'lucide-react';
import type { SocialChartData } from '@shared/schema';

interface SocialCapitalPanelProps {
  data: SocialChartData;
  insights: string[];
}

export default function SocialCapitalPanel({ data, insights }: SocialCapitalPanelProps) {
  //todo: remove mock functionality - replace with real KoboToolbox data
  const getScoreLevel = (score: number) => {
    if (score >= 4) return { label: 'High', variant: 'default' as const };
    if (score >= 3) return { label: 'Medium', variant: 'secondary' as const };
    return { label: 'Low', variant: 'outline' as const };
  };

  const handleInsightClick = (insight: string) => {
    console.log(`Clicked insight: ${insight}`);
  };

  return (
    <Card className="h-full" data-testid="panel-social">
      <CardHeader>
        <div className="flex items-center gap-2">
          <HandHeart className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Social Capital Metrics</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <SocialChart data={data} title="Community Engagement Scores" />
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Key Performance Indicators</span>
            <Badge variant="secondary" className="text-xs">
              Live Data
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {data.datasets[0]?.data.map((score, index) => {
              const label = data.labels[index];
              const scoreLevel = getScoreLevel(score);
              const icons = [Users, Handshake, HandHeart];
              const Icon = icons[index] || Users;
              
              return (
                <div key={label} className="text-center space-y-2" data-testid={`metric-${label.toLowerCase()}`}>
                  <Icon className="h-6 w-6 mx-auto text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="text-lg font-semibold">{score.toFixed(1)}</div>
                  <Badge variant={scoreLevel.variant} className="text-xs">
                    {scoreLevel.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="text-sm font-medium">Community Insights</div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {insights.map((insight, index) => (
              <div 
                key={index} 
                className="text-xs p-2 bg-muted/50 rounded hover-elevate cursor-pointer transition-colors" 
                onClick={() => handleInsightClick(insight)}
                data-testid={`insight-${index}`}
              >
                {insight}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}