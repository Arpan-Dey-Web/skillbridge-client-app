import { Card, CardContent } from "./card";

export default function TutorCardSkeleton() {
  return (
    <Card className="relative bg-card border-border rounded-[2rem] overflow-hidden">
      <CardContent className="p-0">
        <div className="p-7 space-y-6">
          {/* Identity Header Skeleton */}
          <div className="flex justify-between items-start">
            <div className="flex gap-3.5">
              {/* Avatar Skeleton */}
              <div className="size-14 rounded-2xl bg-muted animate-pulse" />

              <div className="pt-1 space-y-2">
                {/* Name Skeleton */}
                <div className="h-4 w-24 bg-muted animate-pulse rounded-md" />
                {/* Category Skeleton */}
                <div className="h-3 w-16 bg-muted animate-pulse rounded-md" />
              </div>
            </div>

            <div className="text-right space-y-1">
              {/* Price Skeleton */}
              <div className="h-6 w-12 bg-muted animate-pulse rounded-md ml-auto" />
              <div className="h-2 w-8 bg-muted animate-pulse rounded-md ml-auto" />
            </div>
          </div>

          {/* Bio Skeleton */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-muted animate-pulse rounded-md" />
            <div className="h-3 w-4/5 bg-muted animate-pulse rounded-md" />
          </div>

          {/* Footer Skeleton */}
          <div className="flex items-center justify-between pt-2">
            {/* Rating Pill Skeleton */}
            <div className="h-8 w-14 bg-muted animate-pulse rounded-xl" />

            {/* Button Skeleton */}
            <div className="h-10 w-[45%] bg-muted animate-pulse rounded-xl" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
