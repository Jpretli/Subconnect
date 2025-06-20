import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getQueryFn } from "@/lib/queryClient";
import StarRating from "./star-rating";
import type { Review } from "@shared/schema";

interface ReviewListProps {
  revieweeId?: number;
  jobId?: number;
  title?: string;
}

export default function ReviewList({ revieweeId, jobId, title = "Reviews" }: ReviewListProps) {
  const endpoint = revieweeId 
    ? `/api/reviews/reviewee/${revieweeId}`
    : jobId 
    ? `/api/reviews/job/${jobId}`
    : null;

  const { data: reviews = [], isLoading, error } = useQuery<Review[]>({
    queryKey: [endpoint],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!endpoint,
  });

  const { data: ratingData } = useQuery<{ averageRating: number; revieweeId: number }>({
    queryKey: [`/api/reviews/rating/${revieweeId}`],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!revieweeId,
  });

  if (!endpoint) {
    return <div className="text-slate-500">No reviews to display</div>;
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        {Array.from({ length: 3 }, (_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-20" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Failed to load reviews</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-slate-500">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        {ratingData && (
          <div className="flex items-center gap-2">
            <StarRating rating={ratingData.averageRating} />
            <span className="text-sm text-slate-600">
              {ratingData.averageRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {reviews.map((review: Review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{review.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={review.rating} size="sm" />
                    <Badge variant="outline" className="text-xs">
                      {review.reviewerType === "contractor" ? "Contractor" : "Subcontractor"}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-slate-500">
                  {new Date(review.createdAt!).toLocaleDateString()}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}