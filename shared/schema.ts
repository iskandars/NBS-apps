import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("operator"), // operator, supervisor, clientadmin, sysadmin
});

export const climateData = pgTable("climate_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  month: text("month").notNull(),
  rainfall: real("rainfall").notNull(),
  temperature: real("temperature").notNull(),
  vegetation: real("vegetation").notNull(),
});

export const socialCapitalData = pgTable("social_capital_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  metric: text("metric").notNull(),
  score: real("score").notNull(),
});

export const species = pgTable("species", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  scientificName: text("scientific_name").notNull().unique(),
  count: integer("count").notNull(),
  status: text("status").notNull(), // endangered, vulnerable, stable, thriving
  trend: text("trend").notNull(), // up, down, stable
  category: text("category").notNull(), // birds, insects, aquatic, plants
});

export const waterStations = pgTable("water_stations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  ph: real("ph").notNull(),
  turbidity: real("turbidity").notNull(),
  temperature: real("temperature").notNull(),
  dissolvedOxygen: real("dissolved_oxygen").notNull(),
  status: text("status").notNull(), // excellent, good, fair, poor
});

export const carbonProjects = pgTable("carbon_projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  area: real("area").notNull(),
  captured: real("captured").notNull(),
  target: real("target").notNull(),
  type: text("type").notNull(), // reforestation, wetland, agroforestry
});

export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(), // critical, warning, info
  category: text("category").notNull(), // environment, biodiversity, water, weather
  timestamp: text("timestamp").notNull(),
  status: text("status").notNull(), // active, acknowledged, resolved
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(), // planning, in-progress, completed
  progress: real("progress").notNull(),
  budget: real("budget").notNull(),
  spent: real("spent").notNull(),
  team: integer("team").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  category: text("category").notNull(), // reforestation, water, biodiversity, community
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export const insertClimateDataSchema = createInsertSchema(climateData).pick({
  month: true,
  rainfall: true,
  temperature: true,
  vegetation: true,
});

export const insertSocialCapitalDataSchema = createInsertSchema(socialCapitalData).pick({
  metric: true,
  score: true,
});

export const insertSpeciesSchema = createInsertSchema(species).omit({
  id: true,
});

export const insertWaterStationSchema = createInsertSchema(waterStations).omit({
  id: true,
});

export const insertCarbonProjectSchema = createInsertSchema(carbonProjects).omit({
  id: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ClimateData = typeof climateData.$inferSelect;
export type SocialCapitalData = typeof socialCapitalData.$inferSelect;
export type InsertClimateData = z.infer<typeof insertClimateDataSchema>;
export type InsertSocialCapitalData = z.infer<typeof insertSocialCapitalDataSchema>;

export type Species = typeof species.$inferSelect;
export type InsertSpecies = z.infer<typeof insertSpeciesSchema>;
export type WaterStation = typeof waterStations.$inferSelect;
export type InsertWaterStation = z.infer<typeof insertWaterStationSchema>;
export type CarbonProject = typeof carbonProjects.$inferSelect;
export type InsertCarbonProject = z.infer<typeof insertCarbonProjectSchema>;
export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

// Role types for RBAC
export type UserRole = "operator" | "supervisor" | "clientadmin" | "sysadmin";

// Chart data types
export interface ClimateChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor?: string;
    fill: boolean;
  }[];
}

export interface SocialChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}
