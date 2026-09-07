import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import HomeTab from './components/tabs/HomeTab';
import StoryTab from './components/tabs/StoryTab';
import EventsTab from './components/tabs/EventsTab';
import VenueTab from './components/tabs/VenueTab';
import RSVPTab from './components/tabs/RSVPTab';

export type TabType = 'home' | 'story' | 'events' | 'venue' | 'rsvp';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [activeTab]);

  const renderTab = () => {
    switch (activeTab) {
      case 'home': return <HomeTab />;
      case 'story': return <StoryTab />;
      case 'events': return <EventsTab />;
      case 'venue': return <VenueTab />;
      case 'rsvp': return <RSVPTab />;
      default: return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-200 flex justify-center items-center p-0 md:p-4">
      {/* Smartphone mockup container for desktop, full screen for mobile */}
      <div className="w-full h-[100dvh] md:h-[850px] md:max-h-[90vh] md:w-[400px] bg-zinc-50 md:rounded-[40px] md:shadow-2xl overflow-hidden relative border-0 md:border-[8px] border-zinc-800 flex flex-col">
        
        {/* Main Content Area */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto pb-20 relative bg-zinc-50" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`
            .flex-1::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="min-h-full"
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
