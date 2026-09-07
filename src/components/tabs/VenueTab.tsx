import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

const VenueTab = () => {
  const mapUrl = "https://maps.google.com/maps?q=Rani+Community+Center,+Jamalpur&t=&z=15&ie=UTF8&iwloc=&output=embed";

  const openInMaps = () => {
    window.open("https://maps.app.goo.gl/QrLuQE84HbTSj4NS9", "_blank");
  };

  return (
    <div className="min-h-full pb-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 pt-12 pb-6 text-center"
      >
        <h2 className="text-3xl font-serif text-zinc-800 mb-2">The Venue</h2>
        <div className="w-12 h-[1px] bg-brand-gold mx-auto"></div>
        <p className="text-sm text-zinc-500 font-sans mt-4">
          All events from October 18-20 will be held at the Bride's Residence in Languljura, Jamalpur.
        </p>
      </motion.div>
      
      <div className="px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[32px] shadow-xl overflow-hidden border border-zinc-100"
        >
          {/* Map Embed Container */}
          <div className="w-full h-[300px] bg-zinc-200 relative">
            <iframe 
              src={mapUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </div>

          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center text-brand-gold mb-4 -mt-14 relative z-10 shadow-md">
              <MapPin size={24} />
            </div>
            
            <h3 className="text-2xl font-serif text-zinc-800 mb-2">Rani Community Center</h3>
            <p className="text-sm text-zinc-500 font-sans mb-6 leading-relaxed">
              Jamalpur, Bangladesh<br/>
              <span className="text-xs uppercase tracking-widest mt-2 block">Reception Venue • October 21</span>
            </p>

            <button 
              onClick={openInMaps}
              className="w-full bg-brand-gold/10 text-brand-gold-dark font-sans text-sm font-semibold tracking-wide uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-gold/20 transition-colors"
            >
              <Navigation size={18} />
              Open in Google Maps
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VenueTab;
