import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getQueryFn } from "@/lib/queryClient";
import ReviewForm from "@/components/review-form";
import ReviewList from "@/components/review-list";
import StarRating from "@/components/star-rating";
import type { Job } from "@shared/schema";

export default function ApplicationReviews() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Mock data for demonstration - in real app this would come from authenticated user
  const currentUserId = 1;
  const userType = "contractor"; // or "subcontractor"

  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ['/api/jobs'],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // Filter completed jobs for review eligibility
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
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-48"></div>
          <div className="h-32 bg-slate-200 rounded"></div>
          <div className="h-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Star className="h-12 w-12 text-brand-blue mr-4" />
          <h1 className="text-4xl font-bold text-slate-900">Reviews & Ratings</h1>
        </div>
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
              {showReviewForm && selectedJob ? (
                <div className="max-w-2xl mx-auto space-y-4">
                  <ReviewForm
                    jobId={selectedJob.id}
                    contractorId={selectedJob.contractorId}
                    subcontractorId={1}
                    reviewerId={currentUserId}
                    revieweeId={userType === "contractor" ? 1 : selectedJob.contractorId}
                    reviewerType={userType as "contractor" | "subcontractor"}
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
              ) : (
                <>
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
                </>
              )}
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
                    <div className="flex items-center justify-between">
                      <span>3 stars</span>
                      <div className="flex-1 mx-3 bg-slate-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <span>0</span>
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
                  revieweeId={currentUserId} 
                  title=""
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}