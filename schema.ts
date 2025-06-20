import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contractors = pgTable("contractors", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  location: text("location").notNull(),
  description: text("description"),
});

export const subcontractors = pgTable("subcontractors", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  primaryTrade: text("primary_trade").notNull(),
  skills: text("skills").array(), // Array of specific skills
  experience: text("experience"),
  serviceArea: text("service_area"),
  maxTravelDistance: integer("max_travel_distance").default(50), // Miles willing to travel
  certifications: text("certifications"),
  email: text("email").notNull(),
  phone: text("phone"),
  latitude: text("latitude"), // For precise location matching
  longitude: text("longitude"),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  contractorId: integer("contractor_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  requiredSkills: text("required_skills").array(), // Array of required skills
  budget: text("budget").notNull(),
  location: text("location").notNull(),
  latitude: text("latitude"), // For precise location matching
  longitude: text("longitude"),
  timeline: text("timeline").notNull(),
  certifications: text("certifications"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull(),
  subcontractorId: integer("subcontractor_id").notNull(),
  proposal: text("proposal").notNull(),
  proposedBudget: text("proposed_budget"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull(),
  contractorId: integer("contractor_id").notNull(),
  subcontractorId: integer("subcontractor_id").notNull(),
  reviewerId: integer("reviewer_id").notNull(), // Who wrote the review
  revieweeId: integer("reviewee_id").notNull(), // Who is being reviewed
  reviewerType: text("reviewer_type").notNull(), // "contractor" or "subcontractor"
  rating: integer("rating").notNull(), // 1-5 stars
  title: text("title").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobMatches = pgTable("job_matches", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull(),
  subcontractorId: integer("subcontractor_id").notNull(),
  overallScore: integer("overall_score").notNull(), // 0-100
  skillScore: integer("skill_score").notNull(), // 0-100
  locationScore: integer("location_score").notNull(), // 0-100
  experienceScore: integer("experience_score").notNull(), // 0-100
  distanceMiles: integer("distance_miles"), // Distance in miles
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContractorSchema = createInsertSchema(contractors).omit({
  id: true,
});

export const insertSubcontractorSchema = createInsertSchema(subcontractors).omit({
  id: true,
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
}).extend({
  rating: z.number().min(1).max(5),
  reviewerType: z.enum(["contractor", "subcontractor"]),
});

export const insertJobMatchSchema = createInsertSchema(jobMatches).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContractor = z.infer<typeof insertContractorSchema>;
export type Contractor = typeof contractors.$inferSelect;
export type InsertSubcontractor = z.infer<typeof insertSubcontractorSchema>;
export type Subcontractor = typeof subcontractors.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertJobMatch = z.infer<typeof insertJobMatchSchema>;
export type JobMatch = typeof jobMatches.$inferSelect;
