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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ClimateData = typeof climateData.$inferSelect;
export type SocialCapitalData = typeof socialCapitalData.$inferSelect;
export type InsertClimateData = z.infer<typeof insertClimateDataSchema>;
export type InsertSocialCapitalData = z.infer<typeof insertSocialCapitalDataSchema>;

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
