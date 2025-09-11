import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Layers } from 'lucide-react';

interface InteractiveMapProps {
  onLayerChange?: (layer: string) => void;
}

export default function InteractiveMap({ onLayerChange }: InteractiveMapProps) {
  const [selectedLayer, setSelectedLayer] = useState('rainfall_layer');

  const layers = [
    { value: 'rainfall_layer', label: 'Rainfall', color: 'hsl(var(--chart-2))' },
    { value: 'temperature_layer', label: 'Temperature', color: 'hsl(var(--chart-3))' },
    { value: 'vegetation_layer', label: 'Vegetation', color: 'hsl(var(--chart-1))' }
  ];

  const handleLayerChange = (layer: string) => {
    setSelectedLayer(layer);
    onLayerChange?.(layer);
    console.log(`Map layer changed to: ${layer}`);
  };

  //todo: remove mock functionality - replace with real Leaflet map integration
  const currentLayer = layers.find(layer => layer.value === selectedLayer);

  return (
    <div className="space-y-4" data-testid="interactive-map">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Map Layers</span>
        </div>
        <Select value={selectedLayer} onValueChange={handleLayerChange}>
          <SelectTrigger className="w-48" data-testid="select-layer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {layers.map((layer) => (
              <SelectItem key={layer.value} value={layer.value}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: layer.color }}
                  />
                  {layer.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Card className="h-64 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 transition-colors duration-500"
          style={{ backgroundColor: currentLayer?.color }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="h-8 w-8 mx-auto text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              Interactive Map - {currentLayer?.label} Layer
            </div>
            <div className="text-xs text-muted-foreground">
              Mock visualization for prototype
            </div>
          </div>
        </div>
        
        {/* Mock data points */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full animate-pulse" 
             style={{ backgroundColor: currentLayer?.color }} />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full animate-pulse" 
             style={{ backgroundColor: currentLayer?.color }} />
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 rounded-full animate-pulse" 
             style={{ backgroundColor: currentLayer?.color }} />
      </Card>
    </div>
  );
}