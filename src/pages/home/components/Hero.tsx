import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const slides = [
    {
      title: "Welcome to Renaissance Camp",
      description: "Where gifted children grow and thrive",
      image: "/images/hero1.jpg",
    },
    {
      title: "Learn & Inspire",
      description: "Technology, Art, Science, and More",
      image: "/images/hero2.jpg",
    },
    {
      title: "Build Your Future",
      description: "Develop skills, make friends, create memories",
      image: "/images/hero3.jpg",
    },
  ];

  return (
    <section className="w-full h-[90vh] relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="w-full h-full flex flex-col justify-center items-center text-center bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(14, 165, 233, 0.5)), url(${slide.image})`,
              }}
            >
              <div className="max-w-2xl px-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg text-pretty mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-white drop-shadow-md mb-8">
                  {slide.description}
                </p>
                <Button className="bg-white text-primary hover:bg-slate-100 font-semibold px-8 py-6 text-lg rounded-full shadow-lg">
                  Learn More
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
