import { memo } from "react";
import aboutImg from "@/assets/images/homeAbout.jpg";

const AboutUsImage = () => {
  return (
    <div className="overflow-hidden rounded-2xl shadow-lg">
      <img
        src={aboutImg || "/placeholder.svg"}
        alt="Renessans Camp"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};

export default memo(AboutUsImage);
