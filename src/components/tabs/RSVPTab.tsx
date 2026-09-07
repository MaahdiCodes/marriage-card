import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

const RSVPTab = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attending: 'yes',
    guests: '1',
    dietary: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 600);
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
              Kindly respond by November 15, 2026
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
                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-semibold">Dietary Requirements</label>
                  <input 
                    type="text" 
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                    placeholder="e.g. Vegetarian, Nut Allergy (Optional)"
                  />
                </div>
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
                className="w-full bg-zinc-900 text-white font-sans text-sm tracking-widest font-semibold uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors mt-4"
              >
                Send RSVP
                <Send size={16} />
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
