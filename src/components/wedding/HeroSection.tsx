import { motion } from "framer-motion";
import heroFloral from "@/assets/hero-floral.png";
import heroFloral2 from "@/assets/hero-floral-2.png";
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-background">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 40%, hsl(38 60% 55% / 0.06) 0%, transparent 70%)'
      }} />

      {/* Floral decoration */}
      <motion.img
        src={heroFloral}
        alt="Floral arrangement"
        className="absolute top-0 right-0 w-56 md:w-80 opacity-40 -translate-y-8 translate-x-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.img
        src={heroFloral2}
        alt="Floral arrangement"
        className="absolute bottom-0 left-0 w-56 md:w-80 opacity-40 translate-y-8 -translate-x-8 rotate-180"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.p
          className="wedding-subheading mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Together with their families
        </motion.p>

        <motion.h1
          className="font-display text-6xl md:text-9xl font-light leading-tight"
          style={{ letterSpacing: '0.04em' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <span className="block">Kaushini</span>
          <motion.span 
            className="block text-2xl md:text-4xl font-body italic wedding-gold-text my-4 md:my-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            &amp;
          </motion.span>
          <span className="block">Gayashan</span>
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-4 my-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <span className="block w-16 h-px bg-accent/40" />
          <span className="text-accent text-xs">✦</span>
          <span className="block w-16 h-px bg-accent/40" />
        </motion.div>

        <motion.p
          className="wedding-subheading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          Request the pleasure of your company
        </motion.p>

        <motion.p
          className="font-display text-2xl md:text-3xl mt-8 font-light italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          Saturday, the 08th of August
        </motion.p>

        <motion.p
          className="wedding-subheading mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          2026
        </motion.p>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        >
          <a
            href="#rsvp"
            className="inline-block px-12 py-4 border border-accent/60 font-sans text-xs uppercase tracking-[0.35em] text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-500"
          >
            RSVP
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-px h-14 bg-accent/30 mx-auto"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
