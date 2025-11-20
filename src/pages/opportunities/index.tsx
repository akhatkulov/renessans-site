import { memo } from "react";
import TechPrograms from "./components/TechPrograms";
import Tournament from "./components/Tournament";
import PageTitle from "@/components/common/PageTitle";

const Opportunities = () => {
  return (
    <PageTitle titleKey="header.navbar.opportunities">
      <section className="py-20">
        <div className="space-y-20">
          <TechPrograms />
          <Tournament />
        </div>
      </section>
    </PageTitle>
  );
};

export default memo(Opportunities);
