import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { HardHat, Wrench, Plus, MapPin, DollarSign, Clock, Send, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import ReviewForm from "@/components/review-form";
import ReviewList from "@/components/review-list";
import StarRating from "@/components/star-rating";
import type { Job, InsertJob, InsertSubcontractor, InsertApplication } from "@shared/schema";

export default function Applications() {
  const { toast } = useToast();
  const [contractorId, setContractorId] = useState(1); // Mock contractor ID
  const [subcontractorId, setSubcontractorId] = useState(1); // Mock subcontractor ID

  // Job form state
  const [jobForm, setJobForm] = useState<Omit<InsertJob, 'contractorId'>>({
    title: "",
    description: "",
    category: "",
    budget: "",
    location: "",
    timeline: "",
    certifications: "",
    status: "active"
  });

  // Subcontractor profile form state
  const [profileForm, setProfileForm] = useState<InsertSubcontractor>({
    companyName: "",
    primaryTrade: "",
    experience: "",
    serviceArea: "",
    certifications: "",
    email: "",
    phone: ""
  });

  // Fetch jobs
  const { data: jobs = [], isLoading: jobsLoading, refetch: refetchJobs } = useQuery<Job[]>({
    queryKey: ["/api/jobs"],
  });

  // Create job mutation
  const createJobMutation = useMutation({
    mutationFn: async (jobData: InsertJob) => {
      const response = await apiRequest("POST", "/api/jobs", jobData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Job posted successfully!",
      });
      setJobForm({
        title: "",
        description: "",
        category: "",
        budget: "",
        location: "",
        timeline: "",
        certifications: "",
        status: "active"
      });
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Create subcontractor profile mutation
  const createProfileMutation = useMutation({
    mutationFn: async (profileData: InsertSubcontractor) => {
      const response = await apiRequest("POST", "/api/subcontractors", profileData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile saved successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Create application mutation
  const createApplicationMutation = useMutation({
    mutationFn: async ({ jobId, proposal }: { jobId: number; proposal: string }) => {
      const applicationData: InsertApplication = {
        jobId,
        subcontractorId,
        proposal,
        proposedBudget: "",
        status: "pending"
      };
      const response = await apiRequest("POST", "/api/applications", applicationData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Application submitted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.description || !jobForm.category || !jobForm.budget || !jobForm.location || !jobForm.timeline) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    createJobMutation.mutate({ ...jobForm, contractorId });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm.companyName || !profileForm.primaryTrade || !profileForm.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    createProfileMutation.mutate(profileForm);
  };

  const handleApplyToJob = (jobId: number) => {
    const proposal = prompt("Please enter your proposal for this job:");
    if (proposal) {
      createApplicationMutation.mutate({ jobId, proposal });
    }
  };

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "Recently";
    return new Date(date).toLocaleDateString();
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Applications Platform</h1>
      
      <Tabs defaultValue="contractors" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="contractors" className="flex items-center gap-2">
            <HardHat className="h-4 w-4" />
            Contractors
          </TabsTrigger>
          <TabsTrigger value="subcontractors" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Subcontractors
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Reviews
          </TabsTrigger>
        </TabsList>

        {/* Contractor Interface */}
        <TabsContent value="contractors">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Job Posting Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Post a New Job</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJobSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      value={jobForm.title}
                      onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                      placeholder="e.g., Commercial Plumbing Installation"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={jobForm.description}
                      onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                      placeholder="Describe the project scope, requirements, and expectations..."
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Trade Category *</Label>
                      <Select onValueChange={(value) => setJobForm({ ...jobForm, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
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
                      <Label htmlFor="budget">Budget Range *</Label>
                      <Select onValueChange={(value) => setJobForm({ ...jobForm, budget: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5k">Under $5,000</SelectItem>
                          <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                          <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="over-100k">Over $100,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Project Location *</Label>
                      <Input
                        id="location"
                        value={jobForm.location}
                        onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                        placeholder="City, State"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="timeline">Timeline *</Label>
                      <Select onValueChange={(value) => setJobForm({ ...jobForm, timeline: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgent (Within 1 week)</SelectItem>
                          <SelectItem value="soon">Soon (1-4 weeks)</SelectItem>
                          <SelectItem value="flexible">Flexible (1-3 months)</SelectItem>
                          <SelectItem value="planning">Planning Stage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="certifications">Required Certifications</Label>
                    <Input
                      id="certifications"
                      value={jobForm.certifications}
                      onChange={(e) => setJobForm({ ...jobForm, certifications: e.target.value })}
                      placeholder="e.g., Licensed Electrician, OSHA 30"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-brand-blue hover:bg-brand-deep"
                    disabled={createJobMutation.isPending}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {createJobMutation.isPending ? "Posting..." : "Post Job"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Posted Jobs Management */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Posted Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                {jobsLoading ? (
                  <div className="text-center py-8 text-slate-600">Loading jobs...</div>
                ) : jobs.length === 0 ? (
                  <div className="text-center py-8 text-slate-600">No jobs posted yet.</div>
                ) : (
                  <div className="space-y-4">
                    {jobs.filter(job => job.contractorId === contractorId).map((job) => (
                      <div key={job.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors duration-200">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-slate-900">{job.title}</h3>
                          <Badge className="bg-green-100 text-green-800">
                            {job.status}
                          </Badge>
                        </div>
                        <p className="text-slate-600 text-sm mb-3">{job.description.substring(0, 100)}...</p>
                        <div className="flex justify-between items-center text-sm text-slate-500">
                          <span>0 Applications</span>
                          <span>Posted {formatDate(job.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Subcontractor Interface */}
        <TabsContent value="subcontractors">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Setup */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Profile</CardTitle>
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
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="serviceArea">Service Area</Label>
                    <Input
                      id="serviceArea"
                      value={profileForm.serviceArea}
                      onChange={(e) => setProfileForm({ ...profileForm, serviceArea: e.target.value })}
                      placeholder="City, State (radius)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="certifications">Certifications</Label>
                    <Textarea
                      id="certifications"
                      rows={3}
                      value={profileForm.certifications}
                      onChange={(e) => setProfileForm({ ...profileForm, certifications: e.target.value })}
                      placeholder="List your certifications..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-brand-blue hover:bg-brand-deep"
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
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-2xl">Available Jobs</CardTitle>
                  <div className="flex space-x-2">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="hvac">HVAC</SelectItem>
                        <SelectItem value="carpentry">Carpentry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  {jobsLoading ? (
                    <div className="text-center py-8 text-slate-600">Loading jobs...</div>
                  ) : jobs.length === 0 ? (
                    <div className="text-center py-8 text-slate-600">No jobs available at the moment.</div>
                  ) : (
                    <div className="space-y-6">
                      {jobs.map((job) => (
                        <div key={job.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-slate-900 mb-2">{job.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {job.location}
                                </span>
                                <span className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  {job.budget}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {job.timeline}
                                </span>
                              </div>
                            </div>
                            <Badge className={getCategoryBadgeColor(job.category)}>
                              {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-slate-700 mb-4">{job.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-slate-500">
                              Posted {formatDate(job.createdAt)} • 0 applicants
                            </div>
                            <Button 
                              onClick={() => handleApplyToJob(job.id)}
                              className="bg-brand-blue hover:bg-brand-deep"
                              disabled={createApplicationMutation.isPending}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Reviews Interface */}
        <TabsContent value="reviews">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Reviews & Ratings</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Share your experience and help build trust within the SubConnect community
              </p>
            </div>

            <Tabs defaultValue="submit" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="submit">Submit Reviews</TabsTrigger>
                <TabsTrigger value="received">Reviews Received</TabsTrigger>
              </TabsList>

              <TabsContent value="submit" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Rate Your Project Partners</CardTitle>
                    <p className="text-slate-600">
                      Select a completed project to leave a review for your project partner.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ReviewSubmissionSection />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="received" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Rating Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-2">
                          <StarRating rating={4.8} size="lg" />
                          <span className="text-2xl font-bold">4.8</span>
                        </div>
                        <p className="text-slate-600">Based on 3 reviews</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span>5 stars</span>
                            <div className="flex-1 mx-3 bg-slate-200 rounded-full h-2">
                              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '67%' }}></div>
                            </div>
                            <span>2</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>4 stars</span>
                            <div className="flex-1 mx-3 bg-slate-200 rounded-full h-2">
                              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '33%' }}></div>
                            </div>
                            <span>1</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ReviewList 
                        revieweeId={1} 
                        title=""
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Review submission component
function ReviewSubmissionSection() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ['/api/jobs'],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const completedJobs = jobs.filter((job: Job) => job.status === "completed");

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    setSelectedJob(null);
  };

  const openReviewForm = (job: Job) => {
    setSelectedJob(job);
    setShowReviewForm(true);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading completed projects...</div>;
  }

  if (showReviewForm && selectedJob) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <ReviewForm
          jobId={selectedJob.id}
          contractorId={selectedJob.contractorId}
          subcontractorId={1}
          reviewerId={1}
          revieweeId={1}
          reviewerType="contractor"
          onSuccess={handleReviewSuccess}
        />
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => setShowReviewForm(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {completedJobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-500">
            No completed projects available for review yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {completedJobs.map((job: Job) => (
            <Card key={job.id} className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                    <p className="text-slate-600 mb-3 line-clamp-2">{job.description}</p>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{job.category}</Badge>
                      <span className="text-sm text-slate-500">
                        Budget: {job.budget}
                      </span>
                      <span className="text-sm text-slate-500">
                        Completed: {new Date(job.createdAt!).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => openReviewForm(job)}
                    variant="outline"
                  >
                    Leave Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
