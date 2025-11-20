import { storage } from "./storage";

export async function seedDatabase() {
  // Check if data already exists
  const existingSpecies = await storage.getAllSpecies();
  if (existingSpecies.length > 0) {
    console.log("Database already seeded");
    return;
  }

  console.log("Seeding database with NBS monitoring data...");

  // Seed species
  await storage.createSpecies({
    name: 'Javan Hawk-Eagle',
    scientificName: 'Nisaetus bartelsi',
    count: 12,
    status: 'endangered',
    trend: 'up',
    category: 'birds'
  });

  await storage.createSpecies({
    name: 'Green Peafowl',
    scientificName: 'Pavo muticus',
    count: 28,
    status: 'vulnerable',
    trend: 'stable',
    category: 'birds'
  });

  await storage.createSpecies({
    name: 'Paradise Flycatcher',
    scientificName: 'Terpsiphone paradisi',
    count: 45,
    status: 'stable',
    trend: 'up',
    category: 'birds'
  });

  await storage.createSpecies({
    name: "Wallace's Bee",
    scientificName: 'Megachile pluto',
    count: 156,
    status: 'vulnerable',
    trend: 'down',
    category: 'insects'
  });

  await storage.createSpecies({
    name: 'Atlas Moth',
    scientificName: 'Attacus atlas',
    count: 89,
    status: 'stable',
    trend: 'stable',
    category: 'insects'
  });

  await storage.createSpecies({
    name: 'Freshwater Crayfish',
    scientificName: 'Cherax quadricarinatus',
    count: 342,
    status: 'thriving',
    trend: 'up',
    category: 'aquatic'
  });

  await storage.createSpecies({
    name: 'Giant Gourami',
    scientificName: 'Osphronemus goramy',
    count: 128,
    status: 'stable',
    trend: 'up',
    category: 'aquatic'
  });

  await storage.createSpecies({
    name: 'Rafflesia',
    scientificName: 'Rafflesia arnoldii',
    count: 8,
    status: 'endangered',
    trend: 'down',
    category: 'plants'
  });

  await storage.createSpecies({
    name: 'Titan Arum',
    scientificName: 'Amorphophallus titanum',
    count: 15,
    status: 'vulnerable',
    trend: 'stable',
    category: 'plants'
  });

  // Seed water stations
  await storage.createWaterStation({
    name: 'Upstream Monitoring Point',
    location: 'River Basin A, Sector 1',
    ph: 7.2,
    turbidity: 12,
    temperature: 24.5,
    dissolvedOxygen: 8.2,
    status: 'excellent'
  });

  await storage.createWaterStation({
    name: 'Midstream Collection',
    location: 'River Basin A, Sector 3',
    ph: 6.8,
    turbidity: 28,
    temperature: 25.8,
    dissolvedOxygen: 6.5,
    status: 'good'
  });

  await storage.createWaterStation({
    name: 'Downstream Assessment',
    location: 'River Basin A, Sector 5',
    ph: 6.5,
    turbidity: 45,
    temperature: 26.2,
    dissolvedOxygen: 5.1,
    status: 'fair'
  });

  // Seed carbon projects
  await storage.createCarbonProject({
    name: 'Mountain Forest Restoration',
    area: 450,
    captured: 3420,
    target: 4500,
    type: 'reforestation'
  });

  await storage.createCarbonProject({
    name: 'Coastal Mangrove Revival',
    area: 280,
    captured: 2150,
    target: 2800,
    type: 'wetland'
  });

  await storage.createCarbonProject({
    name: 'Community Agroforestry',
    area: 320,
    captured: 1890,
    target: 3200,
    type: 'agroforestry'
  });

  // Seed alerts
  await storage.createAlert({
    title: 'High Turbidity Detected',
    description: 'Water turbidity at Downstream Station exceeds 50 NTU threshold',
    severity: 'critical',
    category: 'water',
    timestamp: '2 hours ago',
    status: 'active'
  });

  await storage.createAlert({
    title: 'Temperature Spike Warning',
    description: 'River temperature increased by 3°C in 6 hours',
    severity: 'warning',
    category: 'environment',
    timestamp: '5 hours ago',
    status: 'acknowledged'
  });

  await storage.createAlert({
    title: 'Endangered Species Sighting',
    description: 'Javan Hawk-Eagle spotted in protected area - positive indicator',
    severity: 'info',
    category: 'biodiversity',
    timestamp: '1 day ago',
    status: 'resolved'
  });

  await storage.createAlert({
    title: 'Heavy Rainfall Expected',
    description: 'Weather forecast indicates 120mm+ rainfall in next 48 hours',
    severity: 'warning',
    category: 'weather',
    timestamp: '3 hours ago',
    status: 'active'
  });

  await storage.createAlert({
    title: 'Dissolved Oxygen Below Minimum',
    description: 'DO levels at 4.2 mg/L, below safe threshold of 5 mg/L',
    severity: 'critical',
    category: 'water',
    timestamp: '30 minutes ago',
    status: 'active'
  });

  // Seed projects
  await storage.createProject({
    name: 'Mountain Forest Restoration',
    description: 'Large-scale reforestation of degraded mountain slopes',
    status: 'in-progress',
    progress: 68,
    budget: 250000,
    spent: 175000,
    team: 12,
    startDate: 'Jan 2024',
    endDate: 'Dec 2024',
    category: 'reforestation'
  });

  await storage.createProject({
    name: 'River Basin Water Quality Initiative',
    description: 'Comprehensive water monitoring and treatment program',
    status: 'in-progress',
    progress: 45,
    budget: 180000,
    spent: 95000,
    team: 8,
    startDate: 'Mar 2024',
    endDate: 'Mar 2025',
    category: 'water'
  });

  await storage.createProject({
    name: 'Endangered Species Protection',
    description: 'Habitat preservation for critically endangered species',
    status: 'planning',
    progress: 15,
    budget: 320000,
    spent: 48000,
    team: 6,
    startDate: 'Jun 2024',
    endDate: 'Dec 2025',
    category: 'biodiversity'
  });

  await storage.createProject({
    name: 'Community Education Program',
    description: 'Environmental awareness and capacity building initiative',
    status: 'completed',
    progress: 100,
    budget: 95000,
    spent: 92000,
    team: 5,
    startDate: 'Sep 2023',
    endDate: 'May 2024',
    category: 'community'
  });

  console.log("Database seeded successfully!");
}
