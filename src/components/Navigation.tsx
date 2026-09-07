import { Home, BookHeart, Calendar, MapPin, MailCheck } from 'lucide-react';
import type { TabType } from '../App';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'story', icon: BookHeart, label: 'Story' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'venue', icon: MapPin, label: 'Venue' },
    { id: 'rsvp', icon: MailCheck, label: 'RSVP' },
  ];

  return (
    <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-zinc-200 px-4 pt-3 pb-10 md:pb-4 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as TabType)}
            className={`flex flex-col items-center gap-1.5 p-2 transition-all duration-300 relative w-14 ${
              isActive ? 'text-brand-gold scale-110' : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] font-medium tracking-wide transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
              {item.label}
            </span>
            {isActive && (
              <span className="absolute -bottom-2 w-1 h-1 bg-brand-gold rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;
