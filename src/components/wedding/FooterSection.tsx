import { motion } from "framer-motion";

const FooterSection = () => {
  return (
    <footer className="py-20 px-6 bg-primary text-primary-foreground text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="block w-12 h-px bg-accent/40" />
          <span className="text-accent text-xs">✦</span>
          <span className="block w-12 h-px bg-accent/40" />
        </div>
        <p className="font-display text-3xl md:text-4xl font-light italic">
          Kaushini &amp; Gayashan
        </p>
        <p className="font-sans text-xs uppercase tracking-[0.35em] mt-4 opacity-60">
          August 08, 2026 · Gonapola
        </p>
        <p className="font-body text-sm mt-10 opacity-40 italic">
          Made with love
        </p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
