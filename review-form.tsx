import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import StarRating from "./star-rating";
import type { InsertReview } from "@shared/schema";

const reviewFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  comment: z.string().min(20, "Comment must be at least 20 characters"),
  rating: z.number().min(1, "Please select a rating").max(5, "Rating cannot exceed 5 stars"),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

interface ReviewFormProps {
  jobId: number;
  contractorId: number;
  subcontractorId: number;
  reviewerId: number;
  revieweeId: number;
  reviewerType: "contractor" | "subcontractor";
  onSuccess?: () => void;
}

export default function ReviewForm({
  jobId,
  contractorId,
  subcontractorId,
  reviewerId,
  revieweeId,
  reviewerType,
  onSuccess
}: ReviewFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      title: "",
      comment: "",
      rating: 0,
    },
  });

  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: InsertReview) => {
      const response = await apiRequest("POST", "/api/reviews", reviewData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted",
        description: "Your review has been successfully submitted.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    const reviewData: InsertReview = {
      jobId,
      contractorId,
      subcontractorId,
      reviewerId,
      revieweeId,
      reviewerType,
      rating: data.rating,
      title: data.title,
      comment: data.comment,
    };

    createReviewMutation.mutate(reviewData);
  };

  const handleRatingChange = (rating: number) => {
    form.setValue("rating", rating);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <StarRating
                        rating={field.value}
                        interactive
                        onRatingChange={handleRatingChange}
                        size="lg"
                      />
                      <span className="text-sm text-slate-600">
                        ({field.value > 0 ? `${field.value} star${field.value !== 1 ? 's' : ''}` : 'Select rating'})
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief summary of your experience" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share details about your experience working together..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={createReviewMutation.isPending}
              className="w-full"
            >
              {createReviewMutation.isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}