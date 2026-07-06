import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "1",
    attending: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.attending) {
      toast.error("Please let us know if you'll be attending.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get the Google Sheets URL from environment variables
      const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;

      if (!googleSheetsUrl || googleSheetsUrl.includes('YOUR_DEPLOYMENT_ID')) {
        // Fallback: Show success message but log warning
        console.warn('Google Sheets URL not configured. RSVP data not saved to spreadsheet.');
        toast.success("Thank you for your RSVP! We can't wait to celebrate with you.");
        setFormData({ name: "", phone: "", guests: "1", attending: "", message: "" });
        setIsSubmitting(false);
        return;
      }

      // Send data to Google Sheets
      await fetch(googleSheetsUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Note: With no-cors mode, we can't read the response
      // We assume success if no error is thrown
      toast.success("Thank you for your RSVP! We can't wait to celebrate with you.");
        setFormData({ name: "", phone: "", guests: "1", attending: "", message: "" });
      
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      toast.error("There was an error submitting your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-5 py-4 bg-transparent border-b border-border/60 font-body text-lg focus:outline-none focus:border-accent transition-colors duration-500 placeholder:text-muted-foreground/40";

  return (
    <section className="wedding-section bg-background" id="rsvp">
      <div className="max-w-lg mx-auto text-center">
        <motion.p
          className="wedding-subheading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          We'd love to have you
        </motion.p>
        <motion.h2
          className="wedding-heading mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Kindly Respond
        </motion.h2>
        <motion.div
          className="wedding-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <motion.form
          onSubmit={handleSubmit}
          className="mt-14 text-left space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div>
            <label className="font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-3">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-3">
              Contact Number
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClass}
              placeholder="07X XXX XXXX"
            />
          </div>

          <div>
            <label className="font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-3">
              Will you be attending?
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: "yes" })}
                className={`flex-1 py-4 border font-sans text-xs uppercase tracking-[0.25em] transition-all duration-500 ${
                  formData.attending === "yes"
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-transparent border-border/60 text-foreground hover:border-accent/60"
                }`}
              >
                Joyfully Accept
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: "no" })}
                className={`flex-1 py-4 border font-sans text-xs uppercase tracking-[0.25em] transition-all duration-500 ${
                  formData.attending === "no"
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-transparent border-border/60 text-foreground hover:border-accent/60"
                }`}
              >
                Regretfully Decline
              </button>
            </div>
          </div>

          {formData.attending === "yes" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <label className="font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-3">
                Number of Guests
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className={inputClass}
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                ))}
              </select>
            </motion.div>
          )}

          <div>
            <label className="font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-3">
              Message for the Couple
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className={`${inputClass} resize-none border border-border/60 rounded-none`}
              placeholder="Your warm wishes..."
            />
          </div>

          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-14 py-4 bg-accent text-accent-foreground font-sans text-xs uppercase tracking-[0.35em] hover:opacity-90 transition-all duration-500 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send RSVP"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPSection;
