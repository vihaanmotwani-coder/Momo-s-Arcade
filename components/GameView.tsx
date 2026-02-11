
import React, { useState } from 'react';
import { X, Maximize, RotateCcw, ChevronLeft, Share2 } from 'lucide-react';
import { Game } from '../types';

interface GameViewProps {
  game: Game | null;
  onClose: () => void;
}

const GameView: React.FC<GameViewProps> = ({ game, onClose }) => {
  if (!game) return null;

  const [isLoading, setIsLoading] = useState(true);

  const reloadGame = () => {
    setIsLoading(true);
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe) iframe.src = iframe.src;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="font-bold text-lg leading-tight">{game.title}</h2>
            <p className="text-xs text-indigo-400 font-medium uppercase tracking-widest">{game.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={reloadGame}
            title="Reload Game"
            className="p-2.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button 
            title="Full Screen"
            className="p-2.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors hidden sm:block"
            onClick={() => {
              const iframe = document.getElementById('game-iframe');
              if (iframe?.requestFullscreen) iframe.requestFullscreen();
            }}
          >
            <Maximize className="w-5 h-5" />
          </button>
          <button 
            onClick={onClose}
            className="ml-2 bg-slate-800 hover:bg-rose-600 p-2.5 rounded-lg text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col lg:flex-row overflow-hidden">
        {/* Game Area */}
        <div className="flex-1 bg-black relative flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-10">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-orbitron text-indigo-400 animate-pulse uppercase tracking-widest text-sm">Loading Arena...</p>
            </div>
          )}
          <iframe
            id="game-iframe"
            src={game.iframeUrl}
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Sidebar (Desktop) */}
        <div className="hidden lg:flex w-80 bg-slate-900 border-l border-slate-800 p-6 flex-col gap-6 overflow-y-auto">
          <div>
            <h3 className="text-slate-100 font-bold mb-2">How to Play</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Use your keyboard or mouse to interact. Most games use <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-xs">WASD</kbd> or <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-xs">Arrows</kbd> to move and <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-xs">Space</kbd> to action.
            </p>
          </div>

          <div>
            <h3 className="text-slate-100 font-bold mb-2">Game Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                <span className="text-slate-500">Category</span>
                <span className="text-indigo-400 font-medium">{game.category}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                <span className="text-slate-500">Platform</span>
                <span className="text-slate-300">Web Browser</span>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <Share2 className="w-4 h-4" />
              Share this Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameView;
