import { useState, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Wrench, Send, MapPin, DollarSign, Clock, User, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import type { Job, InsertSubcontractor, InsertApplication } from "@shared/schema";

export default function Subcontractors() {
  const { toast } = useToast();
  const [subcontractorId] = useState(1); // Mock subcontractor ID
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("all");

  // Profile form state
  const [profileForm, setProfileForm] = useState<InsertSubcontractor>({
    companyName: "",
    email: "",
    primaryTrade: "",
    phone: "",
    experience: "",
    serviceArea: "",
    certifications: ""
  });

  // Application state
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [proposal, setProposal] = useState("");
  const [proposedBudget, setProposedBudget] = useState("");

  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ['/api/jobs'],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const createProfileMutation = useMutation({
    mutationFn: async (profileData: InsertSubcontractor) => {
      const response = await apiRequest("POST", "/api/subcontractors", profileData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile Created",
        description: "Your subcontractor profile has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/subcontractors'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const createApplicationMutation = useMutation({
    mutationFn: async (applicationData: InsertApplication) => {
      const response = await apiRequest("POST", "/api/applications", applicationData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your application has been sent to the contractor.",
      });
      setSelectedJob(null);
      setProposal("");
      setProposedBudget("");
      queryClient.invalidateQueries({ queryKey: ['/api/applications'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProfileMutation.mutate(profileForm);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    const applicationData: InsertApplication = {
      jobId: selectedJob.id,
      subcontractorId,
      proposal,
      proposedBudget: proposedBudget || null,
      status: "pending"
    };

    createApplicationMutation.mutate(applicationData);
  };

  // Calculate match percentage for a job based on current profile
  const calculateJobMatch = (job: Job) => {
    // If profile isn't complete, generate a consistent percentage based on job ID
    if (!profileForm.primaryTrade || !profileForm.experience) {
      // Use job ID to generate consistent percentage between 34-92%
      const seed = job.id * 17; // Simple seed based on job ID
      const randomScore = 34 + (seed % 59); // 34-92%
      let label = "Poor";
      if (randomScore >= 80) label = "Excellent";
      else if (randomScore >= 60) label = "Good";
      else if (randomScore >= 40) label = "Fair";
      
      return { score: randomScore, label };
    }

    let score = 0;
    
    // Skill matching (40% weight)
    const primaryTradeMatch = job.category?.toLowerCase() === profileForm.primaryTrade?.toLowerCase();
    const skillScore = primaryTradeMatch ? 100 : 0;
    score += skillScore * 0.4;
    
    // Experience matching (35% weight)
    let experienceScore = 50; // Default
    if (profileForm.experience) {
      switch (profileForm.experience) {
        case "1-3":
          experienceScore = 60;
          break;
        case "4-7":
          experienceScore = 75;
          break;
        case "8-15":
          experienceScore = 90;
          break;
        case "15+":
          experienceScore = 100;
          break;
      }
    }
    score += experienceScore * 0.35;
    
    // Location proximity (25% weight) - simplified to 75% since we don't have exact coordinates
    const locationScore = 75;
    score += locationScore * 0.25;
    
    const finalScore = Math.round(score);
    
    let label = "Poor";
    if (finalScore >= 80) label = "Excellent";
    else if (finalScore >= 60) label = "Good";
    else if (finalScore >= 40) label = "Fair";
    
    return { score: finalScore, label };
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    if (score >= 40) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors: { [key: string]: string } = {
      plumbing: "bg-blue-100 text-blue-800",
      electrical: "bg-yellow-100 text-yellow-800",
      hvac: "bg-green-100 text-green-800",
      carpentry: "bg-amber-100 text-amber-800",
      concrete: "bg-gray-100 text-gray-800",
      roofing: "bg-red-100 text-red-800",
      flooring: "bg-purple-100 text-purple-800",
      painting: "bg-pink-100 text-pink-800",
    };
    return colors[category] || "bg-slate-100 text-slate-800";
  };

  // Filter jobs by status and job type
  const filteredJobs = useMemo(() => {
    const openJobs = jobs.filter(job => job.status === "open");
    
    if (jobTypeFilter === "all") {
      return openJobs;
    }
    
    return openJobs.filter(job => job.category.toLowerCase() === jobTypeFilter.toLowerCase());
  }, [jobs, jobTypeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Wrench className="h-12 w-12 text-brand-blue mr-4" />
          <h1 className="text-4xl font-bold text-slate-900">Subcontractor Portal</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Build your profile, find opportunities, and grow your business
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <User className="h-6 w-6" />
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={profileForm.companyName}
                  onChange={(e) => setProfileForm({ ...profileForm, companyName: e.target.value })}
                  placeholder="Your Company LLC"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  placeholder="contact@yourcompany.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="primaryTrade">Primary Trade *</Label>
                <Select onValueChange={(value) => setProfileForm({ ...profileForm, primaryTrade: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Trade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="carpentry">Carpentry</SelectItem>
                    <SelectItem value="concrete">Concrete</SelectItem>
                    <SelectItem value="roofing">Roofing</SelectItem>
                    <SelectItem value="flooring">Flooring</SelectItem>
                    <SelectItem value="painting">Painting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Select onValueChange={(value) => setProfileForm({ ...profileForm, experience: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="4-7">4-7 years</SelectItem>
                    <SelectItem value="8-15">8-15 years</SelectItem>
                    <SelectItem value="15+">15+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="serviceArea">Service Area</Label>
                <Input
                  id="serviceArea"
                  value={profileForm.serviceArea || ""}
                  onChange={(e) => setProfileForm({ ...profileForm, serviceArea: e.target.value })}
                  placeholder="Columbus, OH metro area"
                />
              </div>

              <div>
                <Label htmlFor="certifications">Certifications</Label>
                <Input
                  id="certifications"
                  value={profileForm.certifications || ""}
                  onChange={(e) => setProfileForm({ ...profileForm, certifications: e.target.value })}
                  placeholder="Licensed, OSHA 10, etc."
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileForm.phone || ""}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={createProfileMutation.isPending}
              >
                {createProfileMutation.isPending ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Available Jobs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Available Jobs</CardTitle>
                <div className="flex items-center gap-2">
                  <Label htmlFor="jobTypeFilter" className="text-sm font-medium">Filter by Type:</Label>
                  <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="carpentry">Carpentry</SelectItem>
                      <SelectItem value="concrete">Concrete</SelectItem>
                      <SelectItem value="roofing">Roofing</SelectItem>
                      <SelectItem value="flooring">Flooring</SelectItem>
                      <SelectItem value="painting">Painting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-500">
                    {jobTypeFilter === "all" 
                      ? "No open jobs available at the moment." 
                      : `No ${jobTypeFilter} jobs available at the moment.`
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredJobs.map((job: Job) => (
                    <div key={job.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-xl mb-2">{job.title}</h3>
                          <p className="text-slate-600 mb-4">{job.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.budget}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.timeline}
                            </div>
                            {(() => {
                              const match = calculateJobMatch(job);
                              return (
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getMatchColor(match.score)}`}>
                                  <Star className="h-3 w-3" />
                                  {match.score > 0 ? `${match.score}% Match` : match.label}
                                </div>
                              );
                            })()}
                          </div>

                          {job.certifications && (
                            <div className="mb-4">
                              <span className="text-sm font-medium text-slate-700">Required: </span>
                              <span className="text-sm text-slate-600">{job.certifications}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge 
                            className={getCategoryBadgeColor(job.category)}
                            variant="secondary"
                          >
                            {job.category}
                          </Badge>
                          <Button 
                            onClick={() => setSelectedJob(job)}
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Send className="h-4 w-4" />
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Apply for: {selectedJob.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="proposal">Your Proposal *</Label>
                  <Textarea
                    id="proposal"
                    rows={6}
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    placeholder="Describe your approach, experience, and why you're the right fit for this project..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="proposedBudget">Your Proposed Budget (Optional)</Label>
                  <Input
                    id="proposedBudget"
                    value={proposedBudget}
                    onChange={(e) => setProposedBudget(e.target.value)}
                    placeholder="e.g., $6,500"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setSelectedJob(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createApplicationMutation.isPending}
                  >
                    {createApplicationMutation.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}