import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-08-08T09:00:00+05:30").getTime();

const getTimeRemaining = () => {
  const difference = Math.max(WEDDING_DATE - Date.now(), 0);

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const timeParts = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

const CountdownSection = () => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const isWeddingTime = Object.values(timeRemaining).every((value) => value === 0);

  return (
    <section className="wedding-section bg-card" id="countdown">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          className="wedding-subheading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Counting Down
        </motion.p>
        <motion.h2
          className="wedding-heading mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Until We Say I Do
        </motion.h2>
        <motion.div
          className="wedding-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {timeParts.map(({ key, label }) => (
            <div key={key} className="wedding-card p-6 md:p-8">
              <p className="font-display text-4xl md:text-6xl font-light tabular-nums wedding-gold-text">
                {String(timeRemaining[key]).padStart(2, "0")}
              </p>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground mt-4">
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {isWeddingTime && (
          <motion.p
            className="font-display text-2xl italic mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Today is the day.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default CountdownSection;
