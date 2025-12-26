import React from 'react';
import { Users, MapPin } from 'lucide-react';
import { DemoSpace } from '../data';

interface SpaceCardProps {
  space: DemoSpace;
  onSelect: () => void;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className="group relative bg-brand-dark3 rounded-none overflow-hidden cursor-pointer border border-white/5 hover:border-brand-red/30 transition-colors h-full"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={space.img} 
          alt={space.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-medium text-lg group-hover:text-brand-red transition-colors">{space.name}</h3>
        </div>
        
        <div className="flex items-center text-white/50 text-xs mb-4 gap-4">
          <span className="flex items-center gap-1"><MapPin size={12} /> {space.area}</span>
          <span className="flex items-center gap-1"><Users size={12} /> {space.cap}</span>
        </div>

        <div className="flex justify-between items-center border-t border-white/10 pt-4">
          <span className="text-white/80 text-sm font-light">From <span className="font-normal">{space.price}</span></span>
          <div className="flex gap-2">
            {space.tags.map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wide px-2 py-1 bg-white/5 text-white/60 rounded-none">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};