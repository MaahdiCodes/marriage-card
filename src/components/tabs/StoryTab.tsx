import { motion } from 'framer-motion';
import { Camera, HeartHandshake, Sparkles, Home } from 'lucide-react';

const StoryTab = () => {
  const milestones = [
    {
      id: 1,
      date: 'May 1, 2026',
      title: 'A Mesmerizing Glimpse',
      description: 'It began with a single photograph. One look at her, and my world stood still. I was utterly mesmerized, knowing instantly that I had to take the next step.',
      icon: Camera
    },
    {
      id: 2,
      date: 'May 31, 2026',
      title: 'The First Meeting',
      description: 'After her parents visited my house, I went to see her at her home. Looking into her eyes confirmed everything my heart already knew.',
      icon: HeartHandshake
    },
    {
      id: 3,
      date: 'June 1, 2026',
      title: 'A Crazy Kind of Love',
      description: 'I was so crazy for her that we married the very next day! To everyone\'s surprise, our love story bloomed overnight. Some even suspected a secret past, but no—it was just pure, irresistible destiny. Bound by vows, custom kept her at her parents\' home for a little longer.',
      icon: Sparkles
    },
    {
      id: 4,
      date: 'October 20, 2026',
      title: 'Happily Ever After',
      description: 'The day we finally celebrate with all our loved ones. I will bring her to my home, which will forever become OUR HOME.',
      icon: Home
    }
  ];

  return (
    <div className="p-8 pt-12 pb-32 flex flex-col items-center min-h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center w-full mb-12"
      >
        <h2 className="text-3xl font-serif text-zinc-800 mb-2">Our Story</h2>
        <div className="w-12 h-[1px] bg-brand-gold mx-auto"></div>
      </motion.div>
      
      <div className="relative w-full max-w-sm mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-[27px] top-4 bottom-4 w-px bg-brand-gold/30"></div>

        {milestones.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2 }}
              className="relative flex gap-6 mb-12 last:mb-0"
            >
              <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-white border border-brand-gold/30 shadow-md flex items-center justify-center text-brand-gold">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <div className="pt-2">
                <span className="text-xs font-sans uppercase tracking-widest text-brand-gold mb-1 block">
                  {item.date}
                </span>
                <h3 className="text-xl font-serif text-zinc-800 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-sans text-justify">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StoryTab;
