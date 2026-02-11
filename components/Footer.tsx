
import React from 'react';
import { Gamepad2, Twitter, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-12 pb-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="w-6 h-6 text-indigo-500" />
            <span className="text-xl font-black font-orbitron tracking-tighter text-indigo-400">MOMO'S ARCADE</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            The ultimate destination for unblocked high-quality web games. Built for gamers, by gamers. No ads, no fluff, just play.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="text-slate-100 font-bold mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Popular Games</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">New Releases</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Categories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-100 font-bold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Request a Game</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Report Issue</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">DMCA</a></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-slate-100 font-bold mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 text-slate-400 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 text-slate-400 hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 text-slate-400 hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2024 Momo's Arcade. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
