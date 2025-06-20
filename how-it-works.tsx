import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Search, MessageCircle, Star, MapPin, Clock, Users, Brain } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Job, JobMatch } from "@shared/schema";

export default function HowItWorks() {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // Fetch all jobs
  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ["/api/jobs"],
  });

  // Fetch matches for selected job
  const { data: matches, isLoading: matchesLoading } = useQuery({
    queryKey: ["/api/jobs", selectedJobId, "matches"],
    enabled: !!selectedJobId,
  });



  // Generate matches mutation
  const generateMatchesMutation = useMutation({
    mutationFn: async (jobId: number) => {
      const response = await apiRequest("POST", `/api/jobs/${jobId}/matches`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["/api/jobs", selectedJobId, "matches"] 
      });
    },
  });



  const selectedJob = jobs?.find((job: Job) => job.id === selectedJobId);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  const getContractorNamesForJob = (jobId: number) => {
    const allNames = [
      "Emma Carter", "Liam Bennett", "Charlotte Hayes", "Noah Peterson", "Olivia Sanders",
      "Ethan Clarke", "Ava Turner", "Mason Walker", "Mia Brooks", "Lucas Reed",
      "Amelia Foster", "Aiden Gray", "Sophia Barrett", "Harper Evans", "Elijah Taylor",
      "Scarlett Mitchell", "Benjamin Scott", "Aria Davis", "Logan Howard", "Layla Morgan",
      "Alexander Parker", "Chloe Fisher", "Samuel Roberts", "Grace Wright", "Isabella Hughes"
    ];
    
    // Create deterministic selection based on jobId - each job gets exactly 5 unique names
    const startIndex = (jobId - 1) * 5; // Each job gets 5 consecutive names
    const selectedNames = [];
    
    for (let i = 0; i < 5; i++) {
      const index = (startIndex + i) % allNames.length;
      selectedNames.push(allNames[index]);
    }
    
    return selectedNames;
  };

  // Create mock match data with job-specific contractors and percentages
  const createMockMatches = (jobId: number) => {
    const contractorNames = getContractorNamesForJob(jobId);
    return contractorNames.map((name, index) => ({
      id: index + 1,
      jobId: jobId,
      subcontractorId: index + 1,
      contractorName: name,
      overallScore: Math.max(34, Math.min(92, 87 - (index * 8) + (jobId % 5))),
      skillScore: Math.max(34, Math.min(92, 84 - (index * 6) + (jobId % 8))),
      locationScore: Math.max(34, Math.min(92, 92 - (index * 7) - (jobId % 6))),
      experienceScore: Math.max(34, Math.min(92, 85 - (index * 5) + (jobId % 7))),
      distanceMiles: 12 + (index * 8) + (jobId % 20),
      createdAt: new Date()
    }));
  };

  const mockMatches = selectedJobId ? createMockMatches(selectedJobId) : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">How SubConnect Works</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Simple, efficient process to connect contractors with qualified subcontractors
        </p>
      </div>

      {/* Process Steps */}
      <div className="space-y-16">
        {/* For Contractors */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">For Contractors</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Post Your Job</h3>
                <p className="text-slate-600">
                  Create detailed job postings with project requirements, timeline, and budget to attract the right subcontractors.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Get Recommendations</h3>
                <p className="text-slate-600">
                  We recommend qualified subcontractors based on their resumes, previous work history, and project fit. Review their profiles and experience.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Hire Pre-Vetted Talent</h3>
                <p className="text-slate-600">
                  Select from our pre-vetted subcontractors for your project. We handle the vetting, you handle the hiring and collaboration.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* For Subcontractors */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">For Subcontractors</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-brand-amber text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Create Your Profile</h3>
                <p className="text-slate-600">
                  Build a comprehensive profile showcasing your skills, experience, certifications, and service areas.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-brand-amber text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Browse & Apply</h3>
                <p className="text-slate-600">
                  Search available jobs that match your expertise and submit applications with your competitive proposals.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-brand-amber text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Get Hired</h3>
                <p className="text-slate-600">
                  Connect with contractors, negotiate project details, and start working on exciting construction projects.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Matching Algorithm Demo */}
      <div className="mt-16">
        <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center mb-4">
              <Brain className="h-12 w-12 text-blue-600 mr-3" />
              <CardTitle className="text-3xl font-bold text-slate-900">
                AI-Powered Matching Algorithm
              </CardTitle>
            </div>
            <p className="text-lg text-slate-600">
              Experience our intelligent matching system that analyzes skills, location, and experience to find perfect matches
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Job Selection */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900">Try It: Select a Job</h3>
                {jobsLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-24 bg-white/50 rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {jobs?.filter((job: Job) => job.status === "open").slice(0, 5).map((job: Job) => (
                      <Card 
                        key={job.id}
                        className={`cursor-pointer transition-all hover:shadow-md bg-white/80 ${
                          selectedJobId === job.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedJobId(job.id)}
                      >
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900 mb-2">{job.title}</h4>
                          <div className="flex items-center text-sm text-slate-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-sm text-slate-600 mb-3">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.timeline} • {job.budget}
                          </div>
                          {job.requiredSkills && job.requiredSkills.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {job.requiredSkills.slice(0, 2).map((skill: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {job.requiredSkills.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{job.requiredSkills.length - 2} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Matching Results */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">AI Matching Results</h3>
                  {selectedJobId && (
                    <Button
                      onClick={() => generateMatchesMutation.mutate(selectedJobId)}
                      disabled={generateMatchesMutation.isPending}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {generateMatchesMutation.isPending ? "Analyzing..." : "Generate Matches"}
                    </Button>
                  )}
                </div>

                {!selectedJobId ? (
                  <Card className="h-80 flex items-center justify-center bg-white/50">
                    <div className="text-center text-slate-500">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a job to see AI matching in action</p>
                    </div>
                  </Card>
                ) : matchesLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-32 bg-white/50 rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {!generateMatchesMutation.isSuccess ? (
                      <Card className="p-6 text-center bg-white/50">
                        <p className="text-slate-500 mb-4">Click "Generate Matches" to see AI analysis</p>
                      </Card>
                    ) : (
                      mockMatches.slice(0, 4).map((match, index: number) => (
                        <Card key={match.id} className="bg-white/80">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-semibold text-slate-900">
                                Match #{index + 1} {match.contractorName}
                              </span>
                              <div className="flex items-center space-x-2">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className={`font-bold ${getScoreColor(match.overallScore)}`}>
                                  {match.overallScore}%
                                </span>
                                <Badge variant={match.overallScore >= 80 ? "default" : match.overallScore >= 60 ? "secondary" : "destructive"} className="text-xs">
                                  {getScoreLabel(match.overallScore)}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-medium text-slate-600">Skills</span>
                                  <span className={`text-xs font-semibold ${getScoreColor(match.skillScore)}`}>
                                    {match.skillScore}%
                                  </span>
                                </div>
                                <Progress value={match.skillScore} className="h-1.5" />
                              </div>
                              
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-medium text-slate-600">
                                    Location ({match.distanceMiles || 0}mi)
                                  </span>
                                  <span className={`text-xs font-semibold ${getScoreColor(match.locationScore)}`}>
                                    {match.locationScore}%
                                  </span>
                                </div>
                                <Progress value={match.locationScore} className="h-1.5" />
                              </div>
                              
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-medium text-slate-600">Experience</span>
                                  <span className={`text-xs font-semibold ${getScoreColor(match.experienceScore)}`}>
                                    {match.experienceScore}%
                                  </span>
                                </div>
                                <Progress value={match.experienceScore} className="h-1.5" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Algorithm Explanation */}
            <div className="mt-8 p-6 bg-white/60 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-4">How Our AI Algorithm Works</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-900 mb-2">Skill Analysis (40%)</h5>
                  <p className="text-sm text-blue-800">
                    Compares required skills with subcontractor expertise, including related skill matching
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h5 className="font-semibold text-purple-900 mb-2">Experience Level (35%)</h5>
                  <p className="text-sm text-purple-800">
                    Evaluates years of experience, certifications, and project complexity match
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-semibold text-green-900 mb-2">Location Proximity (25%)</h5>
                  <p className="text-sm text-green-800">
                    Calculates distance and travel preferences for optimal project logistics
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Pricing Section */}
      <Card className="shadow-lg bg-slate-900">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Transparent Subscription Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-semibold mb-4 text-white">Contractors</h3>
              <div className="mb-4">
                <p className="text-2xl font-bold text-white">5% Commission</p>
                <p className="text-slate-300 text-sm">on successful project earnings</p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold text-white">+ $25/month</p>
                <p className="text-slate-300 text-sm">or $250/year</p>
              </div>
              <p className="text-slate-300 text-sm">
                Plus one-time onboarding fee
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-semibold mb-4 text-white">Subcontractors</h3>
              <div className="mb-4">
                <p className="text-2xl font-bold text-white">$50/month</p>
                <p className="text-slate-300 text-sm">or $500/year</p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold text-white">No Commission</p>
                <p className="text-slate-300 text-sm">Keep 100% of earnings</p>
              </div>
              <p className="text-slate-300 text-sm">
                Plus one-time onboarding fee
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-semibold mb-4 text-white">Student Subcontractors</h3>  
              <div className="mb-4">
                <p className="text-2xl font-bold text-white">$25/month</p>
                <p className="text-slate-300 text-sm">or $250/year</p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold text-white">No Commission</p>
                <p className="text-slate-300 text-sm">Keep 100% of earnings</p>
              </div>
              <p className="text-slate-300 text-sm">
                Discounted student rate
              </p>
            </div>
          </div>
          <p className="mt-8 text-slate-300 text-lg">
            Contact our team for detailed pricing and onboarding information
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
