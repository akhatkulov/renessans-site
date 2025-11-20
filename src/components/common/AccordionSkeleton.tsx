import { Skeleton } from "@/components/ui/skeleton";

export const AccordionSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="border border-slate-200 rounded-lg overflow-hidden"
      >
        <div className="p-5">
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    ))}
  </div>
);
