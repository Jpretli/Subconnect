import { 
  users, contractors, subcontractors, jobs, applications, reviews, jobMatches,
  type User, type InsertUser,
  type Contractor, type InsertContractor,
  type Subcontractor, type InsertSubcontractor,
  type Job, type InsertJob,
  type Application, type InsertApplication,
  type Review, type InsertReview,
  type JobMatch, type InsertJobMatch
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contractors
  getContractor(id: number): Promise<Contractor | undefined>;
  createContractor(contractor: InsertContractor): Promise<Contractor>;
  updateContractor(id: number, contractor: Partial<InsertContractor>): Promise<Contractor | undefined>;
  
  // Subcontractors
  getSubcontractor(id: number): Promise<Subcontractor | undefined>;
  createSubcontractor(subcontractor: InsertSubcontractor): Promise<Subcontractor>;
  updateSubcontractor(id: number, subcontractor: Partial<InsertSubcontractor>): Promise<Subcontractor | undefined>;
  
  // Jobs
  getJob(id: number): Promise<Job | undefined>;
  getJobs(): Promise<Job[]>;
  getJobsByContractor(contractorId: number): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, job: Partial<InsertJob>): Promise<Job | undefined>;
  
  // Applications
  getApplication(id: number): Promise<Application | undefined>;
  getApplicationsByJob(jobId: number): Promise<Application[]>;
  getApplicationsBySubcontractor(subcontractorId: number): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: number, application: Partial<InsertApplication>): Promise<Application | undefined>;
  
  // Reviews
  getReview(id: number): Promise<Review | undefined>;
  getReviewsByJob(jobId: number): Promise<Review[]>;
  getReviewsByReviewee(revieweeId: number): Promise<Review[]>;
  getReviewsByReviewer(reviewerId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  getAverageRating(revieweeId: number): Promise<number>;
  
  // Job Matching
  getAllSubcontractors(): Promise<Subcontractor[]>;
  createJobMatch(jobMatch: InsertJobMatch): Promise<JobMatch>;
  getJobMatches(jobId: number): Promise<JobMatch[]>;
  getSubcontractorMatches(subcontractorId: number): Promise<JobMatch[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contractors: Map<number, Contractor>;
  private subcontractors: Map<number, Subcontractor>;
  private jobs: Map<number, Job>;
  private applications: Map<number, Application>;
  private reviews: Map<number, Review>;
  private jobMatches: Map<number, JobMatch>;
  private currentUserId: number;
  private currentContractorId: number;
  private currentSubcontractorId: number;
  private currentJobId: number;
  private currentApplicationId: number;
  private currentReviewId: number;
  private currentJobMatchId: number;

  constructor() {
    this.users = new Map();
    this.contractors = new Map();
    this.subcontractors = new Map();
    this.jobs = new Map();
    this.applications = new Map();
    this.reviews = new Map();
    this.jobMatches = new Map();
    this.currentUserId = 1;
    this.currentContractorId = 1;
    this.currentSubcontractorId = 1;
    this.currentJobId = 1;
    this.currentApplicationId = 1;
    this.currentReviewId = 1;
    this.currentJobMatchId = 1;

    // Add mock Columbus area job postings
    this.seedColumbusJobs();
  }

  private seedColumbusJobs() {
    const mockJobs = [
      {
        title: "Residential Plumbing Installation - New Construction",
        location: "Dublin, Columbus, OH",
        latitude: "40.0992",
        longitude: "-83.1141",
        description: "Seeking experienced plumber for new residential construction project. Must install complete plumbing systems for 4-bedroom home including bathrooms, kitchen, and utility connections. Project duration 3-4 weeks.",
        contractorId: 1,
        category: "Plumbing",
        requiredSkills: ["residential plumbing", "pipe installation", "bathroom plumbing", "kitchen plumbing", "new construction"],
        budget: "$18,000 - $22,000",
        timeline: "3-4 weeks",
        status: "open",
        certifications: "Licensed Plumber, OSHA 10",
        createdAt: new Date()
      },
      {
        title: "Commercial Electrical Work - Office Building",
        location: "Downtown Columbus, OH",
        latitude: "39.9612",
        longitude: "-82.9988",
        description: "Commercial electrical contractor needed for office building renovation. Install new electrical panels, lighting systems, and outlet configurations for 5,000 sq ft space. Must have commercial experience.",
        contractorId: 1,
        category: "Electrical",
        requiredSkills: ["commercial electrical", "electrical panels", "lighting systems", "office building", "electrical renovation"],
        budget: "$35,000 - $45,000",
        timeline: "6-8 weeks",
        status: "open",
        certifications: "Licensed Electrician, Commercial Experience",
        createdAt: new Date()
      },
      {
        title: "Exterior Painting - Residential Complex",
        location: "Westerville, Columbus, OH",
        latitude: "40.1262",
        longitude: "-82.9291",
        description: "Professional painters needed for exterior painting of 12-unit apartment complex. Includes surface preparation, priming, and two coats of premium exterior paint. Weather-dependent timeline.",
        contractorId: 1,
        category: "Painting",
        requiredSkills: ["exterior painting", "surface preparation", "priming", "apartment complex", "residential painting"],
        budget: "$25,000 - $30,000",
        timeline: "4-6 weeks",
        status: "open",
        certifications: "Insured Painter, Lead-Safe Certified",
        createdAt: new Date()
      },
      {
        title: "Kitchen Renovation - Custom Cabinetry",
        location: "Upper Arlington, Columbus, OH",
        latitude: "40.0175",
        longitude: "-83.0613",
        description: "Experienced carpenter needed for high-end kitchen renovation. Custom cabinet installation, countertop fitting, and trim work. Attention to detail and fine craftsmanship required.",
        contractorId: 1,
        category: "Carpentry",
        requiredSkills: ["custom cabinetry", "kitchen renovation", "cabinet installation", "countertop fitting", "trim work"],
        budget: "$12,000 - $16,000",
        timeline: "2-3 weeks",
        status: "open",
        certifications: "Carpentry License, Portfolio Required",
        createdAt: new Date()
      },
      {
        title: "HVAC Installation - New Construction",
        location: "Hilliard, Columbus, OH",
        latitude: "40.0333",
        longitude: "-83.1583",
        description: "HVAC contractor needed for complete heating and cooling system installation in new 2,500 sq ft home. Includes ductwork, unit installation, and system testing. Energy-efficient system required.",
        contractorId: 1,
        category: "HVAC",
        requiredSkills: ["hvac installation", "ductwork", "heating systems", "cooling systems", "new construction"],
        budget: "$8,000 - $12,000",
        timeline: "2-3 weeks",
        status: "open",
        certifications: "HVAC License, EPA Certified",
        createdAt: new Date()
      },
      {
        title: "Drywall Installation - Commercial Project",
        location: "Worthington, Columbus, OH",
        latitude: "40.0931",
        longitude: "-83.0179",
        description: "Drywall contractors needed for commercial office space. 8,000 sq ft area requiring hanging, taping, and finishing. Professional finish quality required for client-facing areas.",
        contractorId: 1,
        category: "Drywall",
        requiredSkills: ["drywall installation", "drywall finishing", "commercial drywall", "taping", "hanging drywall"],
        budget: "$15,000 - $20,000",
        timeline: "3-4 weeks",
        status: "open",
        certifications: "Commercial Drywall Experience",
        createdAt: new Date()
      },
      {
        title: "Kitchen Renovation - Completed Project",
        location: "Hilliard, Columbus, OH",
        description: "Complete kitchen renovation including cabinets, countertops, and appliances. Project completed successfully with high client satisfaction.",
        contractorId: 1,
        category: "General Contracting",
        budget: "$45,000 - $55,000",
        timeline: "8-10 weeks",
        status: "completed",
        certifications: "General Contractor License",
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) // 60 days ago
      },
      {
        title: "Bathroom Remodel - Completed Project",
        location: "Upper Arlington, Columbus, OH",
        description: "Master bathroom renovation with custom tile work and fixtures. Excellent craftsmanship and timely completion.",
        contractorId: 1,
        category: "Plumbing",
        budget: "$28,000 - $35,000",
        timeline: "4-5 weeks",
        status: "completed",
        certifications: "Licensed Plumber, Tile Installation",
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000) // 45 days ago
      }
    ];

    mockJobs.forEach(job => {
      const id = this.currentJobId++;
      const jobRecord: Job = { ...job, id };
      this.jobs.set(id, jobRecord);
    });

    // Add sample reviews for completed projects
    this.seedSampleReviews();
  }

  private seedSampleReviews() {
    const sampleReviews = [
      {
        jobId: 6, // Kitchen Renovation
        contractorId: 1,
        subcontractorId: 1,
        reviewerId: 1,
        revieweeId: 1,
        reviewerType: "contractor" as const,
        rating: 5,
        title: "Outstanding Kitchen Renovation Work",
        comment: "Exceptional craftsmanship and attention to detail. The subcontractor delivered exactly what was promised and exceeded our expectations. Communication was excellent throughout the project, and they completed the work on time and within budget. Highly recommend for future projects.",
      },
      {
        jobId: 7, // Bathroom Remodel
        contractorId: 1,
        subcontractorId: 1,
        reviewerId: 1,
        revieweeId: 1,
        reviewerType: "contractor" as const,
        rating: 4,
        title: "Professional Bathroom Renovation",
        comment: "Very professional team that delivered quality work. The tile installation was particularly impressive. Minor delays due to material availability, but they communicated well and made adjustments to stay close to schedule. Would work with them again.",
      },
      {
        jobId: 6, // Kitchen Renovation - Review from subcontractor
        contractorId: 1,
        subcontractorId: 1,
        reviewerId: 1,
        revieweeId: 1,
        reviewerType: "subcontractor" as const,
        rating: 5,
        title: "Great Contractor to Work With",
        comment: "Clear communication, fair payment terms, and realistic expectations. The contractor provided detailed plans and was available to answer questions throughout the project. Professional relationship and would definitely work with them again on future projects.",
      }
    ];

    sampleReviews.forEach(review => {
      const id = this.currentReviewId++;
      const reviewRecord: Review = { 
        ...review, 
        id,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
      };
      this.reviews.set(id, reviewRecord);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contractors
  async getContractor(id: number): Promise<Contractor | undefined> {
    return this.contractors.get(id);
  }

  async createContractor(insertContractor: InsertContractor): Promise<Contractor> {
    const id = this.currentContractorId++;
    const contractor: Contractor = { ...insertContractor, id };
    this.contractors.set(id, contractor);
    return contractor;
  }

  async updateContractor(id: number, contractor: Partial<InsertContractor>): Promise<Contractor | undefined> {
    const existing = this.contractors.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...contractor };
    this.contractors.set(id, updated);
    return updated;
  }

  // Subcontractors
  async getSubcontractor(id: number): Promise<Subcontractor | undefined> {
    return this.subcontractors.get(id);
  }

  async createSubcontractor(insertSubcontractor: InsertSubcontractor): Promise<Subcontractor> {
    const id = this.currentSubcontractorId++;
    const subcontractor: Subcontractor = { ...insertSubcontractor, id };
    this.subcontractors.set(id, subcontractor);
    return subcontractor;
  }

  async updateSubcontractor(id: number, subcontractor: Partial<InsertSubcontractor>): Promise<Subcontractor | undefined> {
    const existing = this.subcontractors.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...subcontractor };
    this.subcontractors.set(id, updated);
    return updated;
  }

  // Jobs
  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getJobsByContractor(contractorId: number): Promise<Job[]> {
    return Array.from(this.jobs.values())
      .filter(job => job.contractorId === contractorId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentJobId++;
    const job: Job = { 
      ...insertJob, 
      id, 
      createdAt: new Date(),
      status: 'active'
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: number, job: Partial<InsertJob>): Promise<Job | undefined> {
    const existing = this.jobs.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...job };
    this.jobs.set(id, updated);
    return updated;
  }

  // Applications
  async getApplication(id: number): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async getApplicationsByJob(jobId: number): Promise<Application[]> {
    return Array.from(this.applications.values())
      .filter(app => app.jobId === jobId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getApplicationsBySubcontractor(subcontractorId: number): Promise<Application[]> {
    return Array.from(this.applications.values())
      .filter(app => app.subcontractorId === subcontractorId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentApplicationId++;
    const application: Application = { 
      ...insertApplication, 
      id, 
      createdAt: new Date(),
      status: 'pending'
    };
    this.applications.set(id, application);
    return application;
  }

  async updateApplication(id: number, application: Partial<InsertApplication>): Promise<Application | undefined> {
    const existing = this.applications.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...application };
    this.applications.set(id, updated);
    return updated;
  }

  // Reviews
  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async getReviewsByJob(jobId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.jobId === jobId);
  }

  async getReviewsByReviewee(revieweeId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.revieweeId === revieweeId);
  }

  async getReviewsByReviewer(reviewerId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.reviewerId === reviewerId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { 
      ...insertReview, 
      id,
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    return review;
  }

  async getAverageRating(revieweeId: number): Promise<number> {
    const reviews = await this.getReviewsByReviewee(revieweeId);
    if (reviews.length === 0) return 0;
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((totalRating / reviews.length).toFixed(1));
  }

  // Job Matching methods
  async getAllSubcontractors(): Promise<Subcontractor[]> {
    return Array.from(this.subcontractors.values());
  }

  async createJobMatch(insertJobMatch: InsertJobMatch): Promise<JobMatch> {
    const id = this.currentJobMatchId++;
    const jobMatch: JobMatch = { 
      ...insertJobMatch, 
      id,
      createdAt: new Date()
    };
    this.jobMatches.set(id, jobMatch);
    return jobMatch;
  }

  async getJobMatches(jobId: number): Promise<JobMatch[]> {
    return Array.from(this.jobMatches.values())
      .filter(match => match.jobId === jobId)
      .sort((a, b) => b.overallScore - a.overallScore);
  }

  async getSubcontractorMatches(subcontractorId: number): Promise<JobMatch[]> {
    return Array.from(this.jobMatches.values())
      .filter(match => match.subcontractorId === subcontractorId)
      .sort((a, b) => b.overallScore - a.overallScore);
  }
}

export const storage = new MemStorage();
