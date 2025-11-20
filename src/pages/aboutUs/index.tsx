import { memo } from "react";
import PageTitle from "@/components/common/PageTitle";
import AboutUsContent from "./components/AboutUsContent";
import AboutUsImage from "./components/AboutUsImage";

const AboutUs = () => {
  return (
    <PageTitle titleKey="header.navbar.aboutUs">
      <section className="py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AboutUsImage />
          <AboutUsContent />
        </div>
      </section>
    </PageTitle>
  );
};

export default memo(AboutUs);
