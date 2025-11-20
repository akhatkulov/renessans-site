import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import newsData from "@/news.json";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { ChevronRight } from "lucide-react";
import { NewsListSkeleton } from "@/components/common/NewsCardSkeleton";

export const NewsList = memo(() => {
  const navigate = useNavigate();
  const newsItems = newsData.en.items;
  const [loading] = useState(false);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = newsItems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <NewsListSkeleton />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item: any) => (
          <div
            key={item.id}
            onClick={() => navigate(`/newsDetails/${item.id}`)}
            className="group cursor-pointer"
          >
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <div className="relative overflow-hidden h-40">
                <img
                  src={item.img || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                  {item.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Read more
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <style>{`
          .rc-pagination {
            margin: 0;
          }
          .rc-pagination .rc-pagination-item {
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            margin: 0 4px;
          }
          .rc-pagination .rc-pagination-item a {
            color: #64748b;
          }
          .rc-pagination .rc-pagination-item-active {
            border-color: #6366f1;
            background-color: #6366f1;
          }
          .rc-pagination .rc-pagination-item-active a {
            color: white;
          }
          .rc-pagination .rc-pagination-item:hover {
            border-color: #6366f1;
          }
          .rc-pagination .rc-pagination-item:hover a {
            color: #6366f1;
          }
        `}</style>
        <Pagination
          current={currentPage}
          total={newsItems.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showTitle={false}
          showLessItems
        />
      </div>
    </div>
  );
});

NewsList.displayName = "NewsList";
