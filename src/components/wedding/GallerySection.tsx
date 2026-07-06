import { motion } from "framer-motion";
import galleryVenue from "@/assets/gallery-venue.png";
import galleryTable from "@/assets/gallery-table.png";
import galleryCouple from "@/assets/gallery-couple.png";
import galleryPoruwa from "@/assets/gallery-Poruwa.png";

const images = [
  { src: galleryCouple, alt: "The couple at sunset", span: "md:col-span-2 md:row-span-2" },
  { src: galleryVenue, alt: "Wedding venue", span: "" },
  { src: galleryPoruwa, alt: "Poruwa ceremony", span: "" },
  { src: galleryTable, alt: "Table setting", span: "" },

];

const GallerySection = () => {
  return (
    <section className="wedding-section bg-card" id="gallery">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            className="wedding-subheading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Moments
          </motion.p>
          <motion.h2
            className="wedding-heading mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Gallery
          </motion.h2>
          <motion.div
            className="wedding-divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((img, index) => (
            <motion.div
              key={img.alt}
              className={`overflow-hidden group ${img.span}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
