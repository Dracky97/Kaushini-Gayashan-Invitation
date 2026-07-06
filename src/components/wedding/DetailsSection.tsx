import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, CalendarDays, X } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8 },
};

const VENUE_ADDRESS = "No. 215, Cooray Waththa Thalagala, Gonapola";
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(VENUE_ADDRESS)}&output=embed`;
const MAP_LINK_URL = "https://maps.app.goo.gl/h9BWEJySPihqkHa58";

const DetailsSection = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <section className="wedding-section bg-card" id="details">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p className="wedding-subheading" {...fadeInUp}>
            The Details
          </motion.p>
          <motion.h2 className="wedding-heading mt-4" {...fadeInUp} transition={{ duration: 0.8, delay: 0.1 }}>
            When &amp; Where
          </motion.h2>
          <motion.div className="wedding-divider" {...fadeInUp} transition={{ duration: 0.8, delay: 0.2 }} />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {/* Date */}
            <motion.div className="wedding-card text-center group" {...fadeInUp} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-accent/30 flex items-center justify-center group-hover:border-accent/60 transition-colors duration-500">
                <CalendarDays className="w-6 h-6 text-accent" strokeWidth={1} />
              </div>
              <h3 className="font-display text-xl mb-3 tracking-wide">Date</h3>
              <p className="wedding-body">Saturday</p>
              <p className="font-display text-3xl my-2 wedding-gold-text italic">August 08</p>
              <p className="wedding-body">2026</p>
            </motion.div>

            {/* Time */}
            <motion.div className="wedding-card text-center group" {...fadeInUp} transition={{ duration: 0.8, delay: 0.4 }}>
              <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-accent/30 flex items-center justify-center group-hover:border-accent/60 transition-colors duration-500">
                <Clock className="w-6 h-6 text-accent" strokeWidth={1} />
              </div>
              <h3 className="font-display text-xl mb-3 tracking-wide">Time</h3>
              <p className="wedding-body">Ceremony begins at</p>
              <p className="font-display text-3xl my-2 wedding-gold-text italic">9:00 AM</p>
              <p className="wedding-body">Poruwa Ceremony 11:00 am</p>
            </motion.div>

            {/* Location - clickable */}
            <motion.div
              className="wedding-card text-center group cursor-pointer"
              {...fadeInUp}
              transition={{ duration: 0.8, delay: 0.5 }}
              onClick={() => setShowMap(true)}
            >
              <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-accent/30 flex items-center justify-center group-hover:border-accent/60 transition-colors duration-500">
                <MapPin className="w-6 h-6 text-accent" strokeWidth={1} />
              </div>
              <h3 className="font-display text-xl mb-3 tracking-wide">Venue</h3>
              <p className="wedding-body">Sawingir Hills</p>
              <p className="font-sans text-sm text-muted-foreground mt-3 leading-relaxed">
                Gonapola<br />

              </p>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent mt-4 group-hover:opacity-100 opacity-60 transition-opacity duration-500">
                View on Map ↗
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Modal */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setShowMap(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="relative bg-card border border-border/30 w-full max-w-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
                <div>
                  <h3 className="font-display text-xl tracking-wide">Sawingir Hills</h3>
                  <p className="font-sans text-xs text-muted-foreground mt-1">Goapola</p>
                </div>
                <button
                  onClick={() => setShowMap(false)}
                  className="w-9 h-9 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all duration-300"
                  aria-label="Close map"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Map */}
              <div className="aspect-[4/3]">
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Venue location on Google Maps"
                />
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border/30 text-center">
                <a
                  href={MAP_LINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 border border-accent/60 font-sans text-xs uppercase tracking-[0.25em] text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-500"
                >
                  Get Directions
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DetailsSection;
