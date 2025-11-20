import { lazy, memo } from "react";
import { useRoutes } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";

const HomePage = lazy(() => import("@/pages/home"));
const AllNewsPage = lazy(() => import("@/pages/news"));
const NewsDetailsPage = lazy(() => import("@/pages/newsDetail"));
const AboutUs = lazy(() => import("@/pages/aboutUs"));
const Opportunities = lazy(() => import("@/pages/opportunities"));
const Faq = lazy(() => import("@/pages/faq"));
const Contact = lazy(() => import("@/pages/contact"));

const AppRouter = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "news", element: <AllNewsPage /> },
        { path: "newsDetails/:id", element: <NewsDetailsPage /> },
        { path: "about", element: <AboutUs /> },
        { path: "opportunities", element: <Opportunities /> },
        { path: "faq", element: <Faq /> },
        { path: "contact", element: <Contact /> },
      ],
    },
  ]);

  return routes;
};

export default memo(AppRouter);
