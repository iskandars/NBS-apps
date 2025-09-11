import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ClimateChart from './ClimateChart';
import InteractiveMap from './InteractiveMap';
import { CloudRain, Thermometer, TreePine } from 'lucide-react';
import type { ClimateChartData } from '@shared/schema';

interface ClimatePanelProps {
  data: ClimateChartData;
}

export default function ClimatePanel({ data }: ClimatePanelProps) {
  const [selectedDataset, setSelectedDataset] = useState('rainfall');
  
  const datasetOptions = [
    { value: 'rainfall', label: 'Rainfall', icon: CloudRain, color: 'hsl(var(--chart-2))' },
    { value: 'temperature', label: 'Temperature', icon: Thermometer, color: 'hsl(var(--chart-3))' },
    { value: 'vegetation', label: 'Vegetation', icon: TreePine, color: 'hsl(var(--chart-1))' }
  ];

  //todo: remove mock functionality - replace with real climate data
  const getFilteredData = (dataset: string): ClimateChartData => {
    const mockData = {
      rainfall: {
        labels: data.labels,
        datasets: [{
          label: 'Rainfall (mm)',
          data: [120, 80, 150, 100],
          borderColor: 'hsl(var(--chart-2))',
          backgroundColor: 'hsl(var(--chart-2) / 0.1)',
          fill: true
        }]
      },
      temperature: {
        labels: data.labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: [28, 32, 25, 30],
          borderColor: 'hsl(var(--chart-3))',
          backgroundColor: 'hsl(var(--chart-3) / 0.1)',
          fill: true
        }]
      },
      vegetation: {
        labels: data.labels,
        datasets: [{
          label: 'Vegetation Index',
          data: [0.7, 0.8, 0.6, 0.75],
          borderColor: 'hsl(var(--chart-1))',
          backgroundColor: 'hsl(var(--chart-1) / 0.1)',
          fill: true
        }]
      }
    };
    
    return mockData[dataset as keyof typeof mockData] || mockData.rainfall;
  };

  const handleDatasetChange = (value: string) => {
    setSelectedDataset(value);
    console.log(`Climate dataset changed to: ${value}`);
  };

  const handleLayerChange = (layer: string) => {
    console.log(`Map layer changed to: ${layer}`);
  };

  const selectedOption = datasetOptions.find(opt => opt.value === selectedDataset);
  const Icon = selectedOption?.icon || CloudRain;

  return (
    <Card className="h-full" data-testid="panel-climate">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Climate Indicators</CardTitle>
        </div>
        <Select value={selectedDataset} onValueChange={handleDatasetChange}>
          <SelectTrigger className="w-40" data-testid="select-dataset">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {datasetOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <option.icon className="h-4 w-4" />
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-6">
        <ClimateChart 
          data={getFilteredData(selectedDataset)} 
          title={`${selectedOption?.label} Trends`}
        />
        <InteractiveMap onLayerChange={handleLayerChange} />
      </CardContent>
    </Card>
  );
}