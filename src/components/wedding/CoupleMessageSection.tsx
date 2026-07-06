import { motion } from "framer-motion";

const CoupleMessageSection = () => {
  return (
    <section className="wedding-section bg-card" id="couple-message">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          className="wedding-subheading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          A Special Note
        </motion.p>
        <motion.h2
          className="wedding-heading mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          To Our Lovely Guests
        </motion.h2>
        <motion.div
          className="wedding-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <motion.div
          className="mt-12 mx-auto max-w-2xl space-y-6 font-body text-lg leading-9 text-muted-foreground"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p>
            With hearts full of love and gratitude, we are so happy to celebrate this beautiful chapter of our lives
            with you. Your presence means more to us than words can truly express, and having you by our side makes this
            day even more meaningful.
          </p>
          <p>
            Thank you for your love, your blessings, and for being part of our journey. We cannot wait to share
            laughter, joy, and unforgettable memories with the people who mean so much to us.
          </p>
          <p className="pt-4 font-display text-2xl italic leading-relaxed text-foreground">
            With all our love,
            <br />
            Gayshan &amp; Kaushi
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleMessageSection;
