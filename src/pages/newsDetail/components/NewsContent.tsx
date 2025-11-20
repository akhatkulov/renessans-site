import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import newsData from "@/news.json";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsContentProps {
  id: string;
}

export const NewsContent = memo(({ id }: NewsContentProps) => {
  const navigate = useNavigate();
  const [loading] = useState(false);

  const newsItem = newsData.en.items.find((n: any) => n.id === id);

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-96 w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!newsItem)
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-slate-600">News not found</p>
      </div>
    );

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto">
        <Button
          onClick={() => navigate("/news")}
          variant="ghost"
          className="mb-8 -ml-2 text-slate-600 hover:text-primary"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to News
        </Button>

        <article>
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {newsItem.title}
            </h1>
            <p className="text-lg text-slate-600">{newsItem.description}</p>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden mb-10 shadow-lg">
            <img
              src={newsItem.img || "/placeholder.svg"}
              alt={newsItem.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {newsItem.content}
            </div>
          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Button onClick={() => navigate("/news")} variant="default">
            Back to All News
          </Button>
        </div>
      </div>
    </div>
  );
});

NewsContent.displayName = "NewsContent";
