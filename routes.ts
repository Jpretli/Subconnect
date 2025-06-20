import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContractorSchema, 
  insertSubcontractorSchema, 
  insertJobSchema, 
  insertApplicationSchema,
  insertReviewSchema
} from "@shared/schema";
import { getChatResponse } from "./openai";
import { matchingAlgorithm } from "./matching";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contractors
  app.post("/api/contractors", async (req, res) => {
    try {
      const validatedData = insertContractorSchema.parse(req.body);
      const contractor = await storage.createContractor(validatedData);
      res.json(contractor);
    } catch (error) {
      res.status(400).json({ error: "Invalid contractor data" });
    }
  });

  app.get("/api/contractors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contractor = await storage.getContractor(id);
      if (!contractor) {
        return res.status(404).json({ error: "Contractor not found" });
      }
      res.json(contractor);
    } catch (error) {
      res.status(400).json({ error: "Invalid contractor ID" });
    }
  });

  app.put("/api/contractors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertContractorSchema.partial().parse(req.body);
      const contractor = await storage.updateContractor(id, validatedData);
      if (!contractor) {
        return res.status(404).json({ error: "Contractor not found" });
      }
      res.json(contractor);
    } catch (error) {
      res.status(400).json({ error: "Invalid contractor data" });
    }
  });

  // Subcontractors
  app.post("/api/subcontractors", async (req, res) => {
    try {
      const validatedData = insertSubcontractorSchema.parse(req.body);
      const subcontractor = await storage.createSubcontractor(validatedData);
      res.json(subcontractor);
    } catch (error) {
      res.status(400).json({ error: "Invalid subcontractor data" });
    }
  });

  app.get("/api/subcontractors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const subcontractor = await storage.getSubcontractor(id);
      if (!subcontractor) {
        return res.status(404).json({ error: "Subcontractor not found" });
      }
      res.json(subcontractor);
    } catch (error) {
      res.status(400).json({ error: "Invalid subcontractor ID" });
    }
  });

  app.put("/api/subcontractors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertSubcontractorSchema.partial().parse(req.body);
      const subcontractor = await storage.updateSubcontractor(id, validatedData);
      if (!subcontractor) {
        return res.status(404).json({ error: "Subcontractor not found" });
      }
      res.json(subcontractor);
    } catch (error) {
      res.status(400).json({ error: "Invalid subcontractor data" });
    }
  });

  // Jobs
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.get("/api/jobs/contractor/:contractorId", async (req, res) => {
    try {
      const contractorId = parseInt(req.params.contractorId);
      const jobs = await storage.getJobsByContractor(contractorId);
      res.json(jobs);
    } catch (error) {
      res.status(400).json({ error: "Invalid contractor ID" });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const validatedData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(validatedData);
      res.json(job);
    } catch (error) {
      res.status(400).json({ error: "Invalid job data" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const job = await storage.getJob(id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(400).json({ error: "Invalid job ID" });
    }
  });

  app.put("/api/jobs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertJobSchema.partial().parse(req.body);
      const job = await storage.updateJob(id, validatedData);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(400).json({ error: "Invalid job data" });
    }
  });

  // Applications
  app.get("/api/applications/job/:jobId", async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      const applications = await storage.getApplicationsByJob(jobId);
      res.json(applications);
    } catch (error) {
      res.status(400).json({ error: "Invalid job ID" });
    }
  });

  app.get("/api/applications/subcontractor/:subcontractorId", async (req, res) => {
    try {
      const subcontractorId = parseInt(req.params.subcontractorId);
      const applications = await storage.getApplicationsBySubcontractor(subcontractorId);
      res.json(applications);
    } catch (error) {
      res.status(400).json({ error: "Invalid subcontractor ID" });
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validatedData);
      res.json(application);
    } catch (error) {
      res.status(400).json({ error: "Invalid application data" });
    }
  });

  app.put("/api/applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertApplicationSchema.partial().parse(req.body);
      const application = await storage.updateApplication(id, validatedData);
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      res.status(400).json({ error: "Invalid application data" });
    }
  });

  // Reviews
  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  app.get("/api/reviews/job/:jobId", async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      const reviews = await storage.getReviewsByJob(jobId);
      res.json(reviews);
    } catch (error) {
      res.status(400).json({ error: "Invalid job ID" });
    }
  });

  app.get("/api/reviews/reviewee/:revieweeId", async (req, res) => {
    try {
      const revieweeId = parseInt(req.params.revieweeId);
      const reviews = await storage.getReviewsByReviewee(revieweeId);
      res.json(reviews);
    } catch (error) {
      res.status(400).json({ error: "Invalid reviewee ID" });
    }
  });

  app.get("/api/reviews/rating/:revieweeId", async (req, res) => {
    try {
      const revieweeId = parseInt(req.params.revieweeId);
      const averageRating = await storage.getAverageRating(revieweeId);
      res.json({ averageRating, revieweeId });
    } catch (error) {
      res.status(400).json({ error: "Invalid reviewee ID" });
    }
  });

  // Job Matching API endpoints
  app.post("/api/jobs/:jobId/matches", async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      const job = await storage.getJob(jobId);
      
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }

      const subcontractors = await storage.getAllSubcontractors();
      const matches = matchingAlgorithm.findMatches(job, subcontractors);
      
      // Store matches in database
      for (const match of matches) {
        await storage.createJobMatch(match);
      }
      
      res.json({ matches, count: matches.length });
    } catch (error) {
      console.error("Job matching error:", error);
      res.status(500).json({ error: "Failed to generate matches" });
    }
  });

  app.get("/api/jobs/:jobId/matches", async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      const matches = await storage.getJobMatches(jobId);
      res.json(matches);
    } catch (error) {
      res.status(400).json({ error: "Invalid job ID" });
    }
  });

  app.get("/api/subcontractors/:subcontractorId/matches", async (req, res) => {
    try {
      const subcontractorId = parseInt(req.params.subcontractorId);
      const matches = await storage.getSubcontractorMatches(subcontractorId);
      res.json(matches);
    } catch (error) {
      res.status(400).json({ error: "Invalid subcontractor ID" });
    }
  });

  // Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await getChatResponse(message);
      res.json({ response });
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: "Failed to get chat response" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
