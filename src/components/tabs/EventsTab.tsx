import { motion } from 'framer-motion';
import { MapPin, Sparkles } from 'lucide-react';

const EventsTab = () => {
  const events = [
    {
      id: 'mehendi',
      title: 'Mehendi Night',
      date: 'October 18, 2026',
      venue: 'Bride\'s Residence, Languljura',
      notes: 'Join us for a vibrant night of joy, celebration, and beautiful henna.',
      color: 'bg-emerald-50 border-emerald-100 text-emerald-900',
      badge: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'holud',
      title: 'Gaye Holud',
      date: 'October 19, 2026',
      venue: 'Bride\'s Residence, Languljura',
      notes: 'The traditional turmeric ceremony filled with joy and colors.',
      color: 'bg-amber-50 border-amber-100 text-amber-900',
      badge: 'bg-amber-200 text-amber-800'
    },
    {
      id: 'wedding',
      title: 'The Wedding',
      date: 'October 20, 2026',
      venue: 'Bride\'s Residence, Languljura',
      notes: 'The grand celebration where I finally bring her to OUR HOME.',
      color: 'bg-rose-50 border-rose-100 text-rose-900',
      badge: 'bg-rose-200 text-rose-800'
    },
    {
      id: 'reception',
      title: 'Reception',
      date: 'October 21, 2026',
      venue: 'Rani Community Center',
      notes: 'Lunch and celebrations hosted by the Groom\'s family.',
      color: 'bg-indigo-50 border-indigo-100 text-indigo-900',
      badge: 'bg-indigo-200 text-indigo-800'
    }
  ];

  return (
    <div className="p-6 pt-12 pb-32 min-h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center w-full mb-10"
      >
        <h2 className="text-3xl font-serif text-zinc-800 mb-2">The Events</h2>
        <div className="w-12 h-[1px] bg-brand-gold mx-auto"></div>
      </motion.div>
      
      <div className="flex flex-col gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-2xl p-6 border shadow-sm relative overflow-hidden ${event.color}`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={64} />
            </div>
            
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-sans uppercase tracking-widest font-semibold mb-4 ${event.badge}`}>
              {event.date}
            </span>
            
            <h3 className="text-2xl font-serif mb-4">{event.title}</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm font-sans opacity-90">
                <MapPin size={16} />
                <span>{event.venue}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-black/10">
              <p className="text-sm italic opacity-80 leading-relaxed">{event.notes}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventsTab;
