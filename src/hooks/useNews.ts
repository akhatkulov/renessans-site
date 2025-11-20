// import { useQuery } from "@tanstack/react-query";
// import { api } from "@/lib/api";

// export const useNews = () => {
//   return useQuery({
//     queryKey: ["news"],
//     queryFn: () => api.fetchNews(),
//   });
// };

// export const useNewsById = (id: string | undefined) => {
//   return useQuery({
//     queryKey: ["news", id],
//     queryFn: () => api.fetchNewsById(id!),
//     enabled: !!id,
//   });
// };
