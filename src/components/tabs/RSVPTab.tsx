import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

const RSVPTab = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attending: 'yes',
    events: 'Both (Oct 20 & 21)',
    accommodation: 'No',
    guests: '1',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Send Email Notification via Web3Forms
      const emailPromise = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "b13e4c90-86d0-4cb9-a672-ccd9de5e98a8",
          subject: `New RSVP: ${formData.name} is ${formData.attending === 'yes' ? 'Attending ' + formData.events : 'Not Attending'}`,
          from_name: "Wedding RSVP System",
          ...formData
        }),
      });

      // 2. Save Data to Google Sheets
      const sheetPromise = fetch("https://script.google.com/macros/s/AKfycbyP57F_SvhA3_qaKI-Ow5dApT0RiN86Mvnf4ym9FcIqvLqIcRMSzgTDWaVi_rs25Rac/exec", {
        method: "POST",
        mode: "no-cors", // Prevents strict browser CORS errors
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      // Execute both simultaneously
      const [emailResponse] = await Promise.all([emailPromise, sheetPromise]);
      const result = await emailResponse.json();
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error! Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6 pt-12 pb-32 min-h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center w-full mb-8"
      >
        <h2 className="text-3xl font-serif text-zinc-800 mb-2">RSVP</h2>
        <div className="w-12 h-[1px] bg-brand-gold mx-auto"></div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-zinc-100"
          >
            <p className="text-center text-sm text-zinc-500 mb-6 font-sans">
              Kindly respond by September 30, 2026
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-semibold">Full Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-semibold">Phone / WhatsApp</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                  placeholder="+880 1..."
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-semibold">Attending?</label>
                  <select
                    name="attending"
                    value={formData.attending}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors appearance-none"
                  >
                    <option value="yes">Joyfully Accept</option>
                    <option value="no">Regretfully Decline</option>
                  </select>
                </div>

                {formData.attending === 'yes' && (
                  <div className="flex-1">
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-semibold">Guests</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors appearance-none"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                    </select>
                  </div>
                )}
              </div>

              {formData.attending === 'yes' && (
                <>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-semibold">Which events will you attend?</label>
                    <select
                      name="events"
                      value={formData.events}
                      onChange={handleChange}
                      className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors appearance-none"
                    >
                      <option value="Both (Oct 20 & 21)">Both Events (Oct 20 & 21)</option>
                      <option value="Reception Only (Oct 21)">Reception Only (Oct 21 - Main Event)</option>
                      <option value="Wedding Only (Oct 20)">Wedding Only (Oct 20)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-semibold">Do you require accommodation?</label>
                    <select
                      name="accommodation"
                      value={formData.accommodation}
                      onChange={handleChange}
                      className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors appearance-none"
                    >
                      <option value="No">No, I'll arrange my own / I'm local</option>
                      <option value="Yes">Yes, please arrange accommodation</option>
                    </select>
                  </div>


                </>
              )}

              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-semibold">Message for the Couple</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors resize-none"
                  placeholder="Send your wishes..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-zinc-900 text-white font-sans text-sm tracking-widest font-semibold uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send RSVP'}
                {!isSubmitting && <Send size={16} />}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-3xl shadow-xl border border-zinc-100 text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-serif text-zinc-800 mb-3">Thank You!</h3>
            <p className="text-zinc-500 font-sans leading-relaxed">
              {formData.attending === 'yes'
                ? `We are so excited to celebrate with you, ${formData.name.split(' ')[0]}!`
                : `We will miss you, ${formData.name.split(' ')[0]}. Thank you for letting us know.`
              }
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-8 text-sm text-brand-gold hover:text-brand-gold-dark uppercase tracking-widest font-semibold"
            >
              Submit Another
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RSVPTab;
