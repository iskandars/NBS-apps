import WaterQualityPanel from '@/components/WaterQualityPanel';

export default function WaterQuality() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Water Quality Monitoring</h1>
        <p className="text-muted-foreground">
          Real-time water quality analysis across monitoring stations with pH, turbidity, temperature, and dissolved oxygen tracking.
        </p>
      </div>
      
      <WaterQualityPanel />
    </div>
  );
}