import { motion } from "framer-motion";

const events = [
  { time: "09:41 AM", title: "Registration", description: "The official signing of the marriage registry with witnesses." },
  { time: "11:06 AM", title: "Poruwa Ceremony", description: "The traditional Sri Lankan custom where the couple steps onto the Poruwa platform to perform sacred rituals" },
  { time: "11:21 AM", title: "Wedding Ring Exchange", description: "Exchange of Rings beneath the grand floral arch" },
  { time: "11:32 PM", title: "Poruwa Ceremony Ends", description: "The completion of the traditional rituals" },
  { time: "12:12 PM", title: "Lunch", description: "A delicious celebratory feast served for all family and friends" },
  { time: "04:21 PM", title: "Couple Leaves", description: "The couple departs after the ceremony" },
];

const AgendaSection = () => {
  return (
    <section className="wedding-section bg-background" id="agenda">
      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          className="wedding-subheading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          The Celebration
        </motion.p>
        <motion.h2
          className="wedding-heading mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Order of Events
        </motion.h2>
        <motion.div
          className="wedding-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      <div className="max-w-xl mx-auto mt-16">
        <div className="relative">
          {/* Timeline line - gradient */}
          <div 
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{ background: 'linear-gradient(to bottom, transparent, hsl(38 60% 55% / 0.3) 10%, hsl(38 60% 55% / 0.3) 90%, transparent)' }}
          />

          {events.map((event, index) => (
            <motion.div
              key={event.title}
              className="relative flex items-start mb-14 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Timeline dot with ring */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1.5 mt-2 z-10">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent/30 animate-ping" style={{ animationDuration: '3s' }} />
              </div>

              {/* Time (left on desktop) */}
              <div className="hidden md:block w-1/2 pr-10 text-right">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent mt-1">
                  {event.time}
                </p>
              </div>

              {/* Content (right on desktop) */}
              <div className="pl-14 md:pl-10 md:w-1/2">
                <p className="md:hidden font-sans text-xs uppercase tracking-[0.2em] text-accent mb-1">
                  {event.time}
                </p>
                <h3 className="font-display text-xl tracking-wide">{event.title}</h3>
                <p className="font-body text-muted-foreground mt-1 leading-relaxed">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
