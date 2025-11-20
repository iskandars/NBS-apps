import { 
  type User, 
  type InsertUser,
  type Species,
  type InsertSpecies,
  type WaterStation,
  type InsertWaterStation,
  type CarbonProject,
  type InsertCarbonProject,
  type Alert,
  type InsertAlert,
  type Project,
  type InsertProject
} from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Biodiversity
  getAllSpecies(): Promise<Species[]>;
  getSpeciesByCategory(category: string): Promise<Species[]>;
  createSpecies(species: InsertSpecies): Promise<Species>;
  updateSpecies(id: string, data: Partial<InsertSpecies>): Promise<Species | undefined>;
  deleteSpecies(id: string): Promise<boolean>;
  
  // Water Quality
  getAllWaterStations(): Promise<WaterStation[]>;
  getWaterStation(id: string): Promise<WaterStation | undefined>;
  createWaterStation(station: InsertWaterStation): Promise<WaterStation>;
  updateWaterStation(id: string, data: Partial<InsertWaterStation>): Promise<WaterStation | undefined>;
  deleteWaterStation(id: string): Promise<boolean>;
  
  // Carbon Projects
  getAllCarbonProjects(): Promise<CarbonProject[]>;
  getCarbonProject(id: string): Promise<CarbonProject | undefined>;
  createCarbonProject(project: InsertCarbonProject): Promise<CarbonProject>;
  updateCarbonProject(id: string, data: Partial<InsertCarbonProject>): Promise<CarbonProject | undefined>;
  deleteCarbonProject(id: string): Promise<boolean>;
  
  // Alerts
  getAllAlerts(): Promise<Alert[]>;
  getAlertsByStatus(status: string): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: string, data: Partial<InsertAlert>): Promise<Alert | undefined>;
  deleteAlert(id: string): Promise<boolean>;
  
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, data: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private species: Map<string, Species>;
  private waterStations: Map<string, WaterStation>;
  private carbonProjects: Map<string, CarbonProject>;
  private alerts: Map<string, Alert>;
  private projects: Map<string, Project>;

  constructor() {
    this.users = new Map();
    this.species = new Map();
    this.waterStations = new Map();
    this.carbonProjects = new Map();
    this.alerts = new Map();
    this.projects = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, role: insertUser.role || 'operator' };
    this.users.set(id, user);
    return user;
  }

  // Biodiversity
  async getAllSpecies(): Promise<Species[]> {
    return Array.from(this.species.values());
  }

  async getSpeciesByCategory(category: string): Promise<Species[]> {
    return Array.from(this.species.values()).filter(s => s.category === category);
  }

  async createSpecies(insertSpecies: InsertSpecies): Promise<Species> {
    const id = randomUUID();
    const species: Species = { ...insertSpecies, id };
    this.species.set(id, species);
    return species;
  }

  async updateSpecies(id: string, data: Partial<InsertSpecies>): Promise<Species | undefined> {
    const species = this.species.get(id);
    if (!species) return undefined;
    const updated = { ...species, ...data };
    this.species.set(id, updated);
    return updated;
  }

  async deleteSpecies(id: string): Promise<boolean> {
    return this.species.delete(id);
  }

  // Water Quality
  async getAllWaterStations(): Promise<WaterStation[]> {
    return Array.from(this.waterStations.values());
  }

  async getWaterStation(id: string): Promise<WaterStation | undefined> {
    return this.waterStations.get(id);
  }

  async createWaterStation(insertStation: InsertWaterStation): Promise<WaterStation> {
    const id = randomUUID();
    const station: WaterStation = { ...insertStation, id };
    this.waterStations.set(id, station);
    return station;
  }

  async updateWaterStation(id: string, data: Partial<InsertWaterStation>): Promise<WaterStation | undefined> {
    const station = this.waterStations.get(id);
    if (!station) return undefined;
    const updated = { ...station, ...data };
    this.waterStations.set(id, updated);
    return updated;
  }

  async deleteWaterStation(id: string): Promise<boolean> {
    return this.waterStations.delete(id);
  }

  // Carbon Projects
  async getAllCarbonProjects(): Promise<CarbonProject[]> {
    return Array.from(this.carbonProjects.values());
  }

  async getCarbonProject(id: string): Promise<CarbonProject | undefined> {
    return this.carbonProjects.get(id);
  }

  async createCarbonProject(insertProject: InsertCarbonProject): Promise<CarbonProject> {
    const id = randomUUID();
    const project: CarbonProject = { ...insertProject, id };
    this.carbonProjects.set(id, project);
    return project;
  }

  async updateCarbonProject(id: string, data: Partial<InsertCarbonProject>): Promise<CarbonProject | undefined> {
    const project = this.carbonProjects.get(id);
    if (!project) return undefined;
    const updated = { ...project, ...data };
    this.carbonProjects.set(id, updated);
    return updated;
  }

  async deleteCarbonProject(id: string): Promise<boolean> {
    return this.carbonProjects.delete(id);
  }

  // Alerts
  async getAllAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values());
  }

  async getAlertsByStatus(status: string): Promise<Alert[]> {
    return Array.from(this.alerts.values()).filter(a => a.status === status);
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = randomUUID();
    const alert: Alert = { ...insertAlert, id };
    this.alerts.set(id, alert);
    return alert;
  }

  async updateAlert(id: string, data: Partial<InsertAlert>): Promise<Alert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;
    const updated = { ...alert, ...data };
    this.alerts.set(id, updated);
    return updated;
  }

  async deleteAlert(id: string): Promise<boolean> {
    return this.alerts.delete(id);
  }

  // Projects
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, data: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    const updated = { ...project, ...data };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }
}

export const storage = new MemStorage();
