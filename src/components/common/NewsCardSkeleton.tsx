import { Skeleton } from "@/components/ui/skeleton";

export const NewsCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
    <Skeleton className="w-full h-40" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-16" />
    </div>
  </div>
);

export const NewsListSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <NewsCardSkeleton key={i} />
    ))}
  </div>
);
