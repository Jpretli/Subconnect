import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HardHat, Plus, MapPin, DollarSign, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import type { Job, InsertJob } from "@shared/schema";

export default function Contractors() {
  const { toast } = useToast();
  const [contractorId] = useState(1); // Mock contractor ID

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

  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ['/api/jobs'],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const createJobMutation = useMutation({
    mutationFn: async (jobData: InsertJob) => {
      const response = await apiRequest("POST", "/api/jobs", jobData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Job Posted Successfully",
        description: "Your job posting is now live and visible to subcontractors.",
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
      queryClient.invalidateQueries({ queryKey: ['/api/jobs'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const jobData: InsertJob = {
      ...jobForm,
      contractorId
    };
    createJobMutation.mutate(jobData);
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

  const myJobs = jobs.filter(job => job.contractorId === contractorId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <HardHat className="h-12 w-12 text-brand-blue mr-4" />
          <h1 className="text-4xl font-bold text-slate-900">Contractor Portal</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Post jobs, manage projects, and connect with skilled subcontractors
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Job Posting Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Plus className="h-6 w-6" />
              Post a New Job
            </CardTitle>
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
                  <Input
                    id="budget"
                    value={jobForm.budget}
                    onChange={(e) => setJobForm({ ...jobForm, budget: e.target.value })}
                    placeholder="e.g., $5,000 - $8,000"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
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
                  <Input
                    id="timeline"
                    value={jobForm.timeline}
                    onChange={(e) => setJobForm({ ...jobForm, timeline: e.target.value })}
                    placeholder="e.g., 2-3 weeks"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="certifications">Required Certifications</Label>
                <Input
                  id="certifications"
                  value={jobForm.certifications || ""}
                  onChange={(e) => setJobForm({ ...jobForm, certifications: e.target.value })}
                  placeholder="e.g., Licensed Plumber, OSHA 10"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={createJobMutation.isPending}
              >
                {createJobMutation.isPending ? "Posting Job..." : "Post Job"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Posted Jobs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Your Posted Jobs</CardTitle>
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
            ) : myJobs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500">No jobs posted yet. Create your first job posting!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <Badge 
                        className={getCategoryBadgeColor(job.category)}
                        variant="secondary"
                      >
                        {job.category}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-600 mb-3 line-clamp-2">{job.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-500">
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}