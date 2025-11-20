import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import img1 from "@/assets/images/foto_gallery.jpg";
import img2 from "@/assets/images/foto_gallery_2.jpg";
import img3 from "@/assets/images/foto_gallery_3jpg.jpg";

const images = [
  { src: img1, alt: "Gallery 1" },
  { src: img2, alt: "Gallery 2" },
  { src: img3, alt: "Gallery 3" },
];

export const FotoGallerySection = memo(() => {
  const { t } = useTranslation();
  const [index, setIndex] = useState<number>(-1);

  return (
    <section className=" ">
      <div>
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground">
            {t("home.gallery.image")}
          </h2>
          <p className="text-slate-600 mt-2">Explore our amazing moments</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="cursor-pointer group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setIndex(i)}
            >
              <img
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images}
        plugins={[Thumbnails, Zoom]}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        }}
        carousel={{
          finite: false,
          imageFit: "contain",
          spacing: "20%",
        }}
        thumbnails={{
          position: "bottom",
          width: 100,
          height: 60,
          border: 2,
          borderRadius: 8,
          padding: 10,
          gap: 8,
          borderColor: "#ddd",
        }}
      />
    </section>
  );
});

FotoGallerySection.displayName = "FotoGallerySection";
