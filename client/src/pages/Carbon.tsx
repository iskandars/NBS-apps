import CarbonPanel from '@/components/CarbonPanel';

export default function Carbon() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Carbon Sequestration Tracking</h1>
        <p className="text-muted-foreground">
          Monitor carbon capture across reforestation, wetland, and agroforestry projects with detailed progress tracking.
        </p>
      </div>
      
      <CarbonPanel />
    </div>
  );
}