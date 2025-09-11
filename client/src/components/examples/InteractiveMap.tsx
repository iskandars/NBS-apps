import InteractiveMap from '../InteractiveMap';

export default function InteractiveMapExample() {
  const handleLayerChange = (layer: string) => {
    console.log(`Map layer changed to: ${layer}`);
  };

  return <InteractiveMap onLayerChange={handleLayerChange} />;
}