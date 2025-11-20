import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertSpeciesSchema,
  insertWaterStationSchema,
  insertCarbonProjectSchema,
  insertAlertSchema,
  insertProjectSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Biodiversity routes
  app.get("/api/species", async (req, res) => {
    try {
      const { category } = req.query;
      const species = category 
        ? await storage.getSpeciesByCategory(category as string)
        : await storage.getAllSpecies();
      res.json(species);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch species" });
    }
  });

  app.post("/api/species", async (req, res) => {
    try {
      const data = insertSpeciesSchema.parse(req.body);
      const species = await storage.createSpecies(data);
      res.status(201).json(species);
    } catch (error) {
      res.status(400).json({ error: "Invalid species data" });
    }
  });

  app.patch("/api/species/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const species = await storage.updateSpecies(id, req.body);
      if (!species) {
        return res.status(404).json({ error: "Species not found" });
      }
      res.json(species);
    } catch (error) {
      res.status(400).json({ error: "Failed to update species" });
    }
  });

  // Water quality routes
  app.get("/api/water-stations", async (req, res) => {
    try {
      const stations = await storage.getAllWaterStations();
      res.json(stations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch water stations" });
    }
  });

  app.get("/api/water-stations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const station = await storage.getWaterStation(id);
      if (!station) {
        return res.status(404).json({ error: "Station not found" });
      }
      res.json(station);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch station" });
    }
  });

  app.post("/api/water-stations", async (req, res) => {
    try {
      const data = insertWaterStationSchema.parse(req.body);
      const station = await storage.createWaterStation(data);
      res.status(201).json(station);
    } catch (error) {
      res.status(400).json({ error: "Invalid station data" });
    }
  });

  app.patch("/api/water-stations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const station = await storage.updateWaterStation(id, req.body);
      if (!station) {
        return res.status(404).json({ error: "Station not found" });
      }
      res.json(station);
    } catch (error) {
      res.status(400).json({ error: "Failed to update station" });
    }
  });

  // Carbon project routes
  app.get("/api/carbon-projects", async (req, res) => {
    try {
      const projects = await storage.getAllCarbonProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch carbon projects" });
    }
  });

  app.get("/api/carbon-projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.getCarbonProject(id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/carbon-projects", async (req, res) => {
    try {
      const data = insertCarbonProjectSchema.parse(req.body);
      const project = await storage.createCarbonProject(data);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.patch("/api/carbon-projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.updateCarbonProject(id, req.body);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: "Failed to update project" });
    }
  });

  // Alert routes
  app.get("/api/alerts", async (req, res) => {
    try {
      const { status } = req.query;
      const alerts = status 
        ? await storage.getAlertsByStatus(status as string)
        : await storage.getAllAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const data = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(data);
      res.status(201).json(alert);
    } catch (error) {
      res.status(400).json({ error: "Invalid alert data" });
    }
  });

  app.patch("/api/alerts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const alert = await storage.updateAlert(id, req.body);
      if (!alert) {
        return res.status(404).json({ error: "Alert not found" });
      }
      res.json(alert);
    } catch (error) {
      res.status(400).json({ error: "Failed to update alert" });
    }
  });

  // Project management routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(data);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.updateProject(id, req.body);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: "Failed to update project" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
