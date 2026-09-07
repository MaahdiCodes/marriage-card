import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarHeart } from 'lucide-react';

const HomeTab = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-10-20T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addToCalendar = () => {
    const url = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shuvo+%26+Himu%27s+Wedding&dates=20261020T180000Z/20261020T230000Z&details=Join+us+to+celebrate+our+wedding!&location=Languljura,+Jamalpur";
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col items-center pb-8">
      {/* Hero Image Section */}
      <div className="w-full h-[65vh] relative overflow-hidden rounded-b-[40px] shadow-lg">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" 
          alt="Couple holding hands" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-6">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="uppercase tracking-[0.3em] text-xs font-sans mb-4 text-white/90"
          >
            We are getting married
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-6xl font-serif font-medium leading-tight mb-2 drop-shadow-lg"
          >
            Shuvo<br/><span className="text-brand-gold italic text-4xl">&</span><br/>Himu
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-[9px] font-sans text-white/80 uppercase tracking-widest leading-relaxed px-4"
          >
            Son of Md Mukaddes Ali & Anwara Begum Rani<br/>
            <span className="text-brand-gold mx-2">|</span><br/>
            Daughter of Md. Humayun Kabir & Rasheda Parvin Bina
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 w-12 h-[1px] bg-brand-gold"
          ></motion.div>
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full px-8 -mt-12 z-30 relative flex flex-col items-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full text-center border border-zinc-100">
          <h2 className="text-2xl text-zinc-800 mb-2">October 20, 2026</h2>
          <p className="text-sm text-zinc-500 font-sans uppercase tracking-widest mb-8">Jamalpur, Bangladesh</p>
          
          {/* Countdown */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hrs', value: timeLeft.hours },
              { label: 'Min', value: timeLeft.minutes },
              { label: 'Sec', value: timeLeft.seconds }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-2xl font-serif text-brand-gold mb-1">{item.value}</div>
                <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-sans">{item.label}</div>
              </div>
            ))}
          </div>

          <button 
            onClick={addToCalendar}
            className="w-full bg-zinc-900 text-white font-sans text-sm tracking-wide uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-md active:scale-[0.98]"
          >
            <CalendarHeart size={18} className="text-brand-gold" />
            Add to Calendar
          </button>
        </div>
      </div>
      
      <div className="mt-12 mb-8 px-8 text-center">
        <p className="font-serif italic text-xl text-zinc-600 mb-4 leading-relaxed">
          "Two souls with but a single thought,<br/>two hearts that beat as one."
        </p>
      </div>
    </div>
  );
};

export default HomeTab;
