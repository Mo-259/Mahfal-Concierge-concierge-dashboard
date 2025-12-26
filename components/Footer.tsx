import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black text-white/40 text-sm border-t border-white/5 py-12 md:py-16">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-medium mb-4">Explore</h4>
          <ul className="space-y-2">
            <li><a href="#spaces" className="hover:text-white transition-colors">Spaces</a></li>
            <li><a href="#stories" className="hover:text-white transition-colors">Stories</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Host with us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1 flex flex-col justify-end">
          <span className="text-white font-bold text-lg mb-1">Mahfal</span>
          <span className="text-xs">© {new Date().getFullYear()} Mahfal Inc.</span>
        </div>
      </div>
    </footer>
  );
};