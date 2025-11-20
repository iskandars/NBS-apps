import BiodiversityPanel from '@/components/BiodiversityPanel';

export default function Biodiversity() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Biodiversity Monitoring</h1>
        <p className="text-muted-foreground">
          Track species diversity, population trends, and conservation status across protected areas.
        </p>
      </div>
      
      <BiodiversityPanel />
    </div>
  );
}