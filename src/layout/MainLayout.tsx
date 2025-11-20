import { type ReactNode, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  useEffect(() => {
    document.body.style.paddingTop = "0";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full pt-8 pb-12">
        <div className="container">{children ? children : <Outlet />}</div>
      </main>
      <Footer />
    </div>
  );
};
