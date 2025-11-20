import { memo } from "react";
import PageTitle from "@/components/common/PageTitle";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { FotoGallerySection } from "./components/FotoGallerySection ";
import { NewsSection } from "./components/NewsSection";
import { MapSection } from "./components/MapSection";

const Home = () => {
  return (
    <PageTitle titleKey="header.navbar.home">
      <div className="space-y-0">
        <Hero />
        <div className="container space-y-20">
          <AboutSection />
          <FotoGallerySection />
          <NewsSection />
          <MapSection />
        </div>
      </div>
    </PageTitle>
  );
};

export default memo(Home);
