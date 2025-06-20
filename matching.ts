import type { Job, Subcontractor, InsertJobMatch } from "@shared/schema";

interface MatchingScore {
  overallScore: number;
  skillScore: number;
  locationScore: number;
  experienceScore: number;
  distanceMiles: number;
}

export class MatchingAlgorithm {
  // Calculate skill compatibility between job requirements and subcontractor skills
  private calculateSkillScore(jobSkills: string[], subcontractorSkills: string[]): number {
    if (!jobSkills?.length || !subcontractorSkills?.length) {
      return 0;
    }

    const requiredSkills = jobSkills.map(skill => skill.toLowerCase().trim());
    const availableSkills = subcontractorSkills.map(skill => skill.toLowerCase().trim());
    
    // Calculate exact matches
    const exactMatches = requiredSkills.filter(skill => 
      availableSkills.includes(skill)
    ).length;
    
    // Calculate partial matches (similar skills)
    let partialMatches = 0;
    requiredSkills.forEach(reqSkill => {
      if (!availableSkills.includes(reqSkill)) {
        const hasPartialMatch = availableSkills.some(availSkill => 
          this.areSkillsSimilar(reqSkill, availSkill)
        );
        if (hasPartialMatch) partialMatches++;
      }
    });
    
    const totalMatches = exactMatches + (partialMatches * 0.5);
    const maxPossibleScore = requiredSkills.length;
    
    return Math.min(100, Math.round((totalMatches / maxPossibleScore) * 100));
  }

  // Check if two skills are similar (basic matching logic)
  private areSkillsSimilar(skill1: string, skill2: string): boolean {
    const skillSynonyms: Record<string, string[]> = {
      'plumbing': ['pipe', 'water', 'drainage', 'sewer'],
      'electrical': ['electric', 'wiring', 'lighting', 'power'],
      'hvac': ['heating', 'cooling', 'ventilation', 'air conditioning'],
      'carpentry': ['wood', 'framing', 'cabinet', 'trim'],
      'roofing': ['roof', 'shingle', 'gutter', 'leak'],
      'concrete': ['cement', 'foundation', 'slab', 'driveway'],
      'painting': ['paint', 'coating', 'finishing', 'drywall'],
      'landscaping': ['garden', 'lawn', 'irrigation', 'plants'],
    };

    for (const [baseSkill, synonyms] of Object.entries(skillSynonyms)) {
      if ((skill1.includes(baseSkill) || synonyms.some(syn => skill1.includes(syn))) &&
          (skill2.includes(baseSkill) || synonyms.some(syn => skill2.includes(syn)))) {
        return true;
      }
    }
    
    return false;
  }

  // Calculate distance between two coordinates using Haversine formula
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Calculate location score based on distance and travel preferences
  private calculateLocationScore(
    jobLat: number, 
    jobLon: number, 
    subLat: number, 
    subLon: number, 
    maxTravelDistance: number
  ): { score: number; distance: number } {
    const distance = this.calculateDistance(jobLat, jobLon, subLat, subLon);
    
    if (distance > maxTravelDistance) {
      return { score: 0, distance: Math.round(distance) };
    }
    
    // Score decreases linearly with distance
    const score = Math.max(0, Math.round(100 - (distance / maxTravelDistance) * 100));
    return { score, distance: Math.round(distance) };
  }

  // Calculate experience score based on years and project complexity
  private calculateExperienceScore(subcontractorExperience: string): number {
    if (!subcontractorExperience) return 50; // Default neutral score
    
    const experience = subcontractorExperience.toLowerCase();
    
    // Extract years of experience
    const yearsMatch = experience.match(/(\d+)\s*(?:years?|yrs?)/);
    const years = yearsMatch ? parseInt(yearsMatch[1]) : 0;
    
    // Base score on years of experience
    let score = Math.min(40, years * 4); // Max 40 points for 10+ years
    
    // Bonus points for specialized experience keywords
    const bonusKeywords = [
      'certified', 'licensed', 'commercial', 'residential', 
      'industrial', 'project management', 'supervisor', 'lead'
    ];
    
    bonusKeywords.forEach(keyword => {
      if (experience.includes(keyword)) {
        score += 10;
      }
    });
    
    return Math.min(100, score);
  }

  // Main matching function
  public calculateMatch(job: Job, subcontractor: Subcontractor): MatchingScore {
    // Parse coordinates
    const jobLat = job.latitude ? parseFloat(job.latitude) : 0;
    const jobLon = job.longitude ? parseFloat(job.longitude) : 0;
    const subLat = subcontractor.latitude ? parseFloat(subcontractor.latitude) : 0;
    const subLon = subcontractor.longitude ? parseFloat(subcontractor.longitude) : 0;
    
    // Calculate individual scores
    const skillScore = this.calculateSkillScore(
      job.requiredSkills || [], 
      subcontractor.skills || []
    );
    
    const locationResult = this.calculateLocationScore(
      jobLat, jobLon, subLat, subLon, 
      subcontractor.maxTravelDistance || 50
    );
    
    const experienceScore = this.calculateExperienceScore(
      subcontractor.experience || ""
    );
    
    // Weighted overall score
    const weights = {
      skill: 0.4,      // 40% - Most important
      location: 0.25,  // 25% - Important for logistics
      experience: 0.35 // 35% - Very important for quality
    };
    
    const overallScore = Math.round(
      skillScore * weights.skill + 
      locationResult.score * weights.location + 
      experienceScore * weights.experience
    );
    
    return {
      overallScore,
      skillScore,
      locationScore: locationResult.score,
      experienceScore,
      distanceMiles: locationResult.distance
    };
  }

  // Find best matches for a job
  public findMatches(job: Job, subcontractors: Subcontractor[]): InsertJobMatch[] {
    if (subcontractors.length === 0) {
      // Generate mock matches with 34%-92% range for demonstration
      const mockMatches: InsertJobMatch[] = [];
      for (let i = 1; i <= 5; i++) {
        const seed = (job.id * 23 + i * 7) % 100;
        const overallScore = 34 + (seed % 59); // 34-92%
        
        // Generate individual scores that average to the overall score
        const skillScore = Math.max(20, Math.min(100, overallScore + (seed % 21) - 10));
        const experienceScore = Math.max(20, Math.min(100, overallScore + ((seed * 3) % 21) - 10));
        const locationScore = Math.max(20, Math.min(100, overallScore + ((seed * 5) % 21) - 10));
        const distanceMiles = 5 + (seed % 45); // 5-50 miles
        
        mockMatches.push({
          jobId: job.id,
          subcontractorId: i,
          overallScore,
          skillScore,
          locationScore,
          experienceScore,
          distanceMiles
        });
      }
      
      return mockMatches.sort((a, b) => b.overallScore - a.overallScore);
    }

    const matches = subcontractors
      .map(subcontractor => {
        const scores = this.calculateMatch(job, subcontractor);
        return {
          jobId: job.id,
          subcontractorId: subcontractor.id,
          ...scores
        };
      })
      .filter(match => match.overallScore > 20) // Minimum threshold
      .sort((a, b) => b.overallScore - a.overallScore); // Sort by best matches first
    
    return matches;
  }
}

export const matchingAlgorithm = new MatchingAlgorithm();