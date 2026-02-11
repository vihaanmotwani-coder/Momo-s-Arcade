
import React from 'react';
import { Heart, Play } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
  onSelectGame: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ 
  game, 
  isFavorite, 
  onToggleFavorite, 
  onSelectGame 
}) => {
  return (
    <div 
      onClick={() => onSelectGame(game)}
      className="group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-indigo-600 p-4 rounded-full shadow-xl scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
        </div>

        {/* Category Tag */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded text-indigo-400 border border-indigo-400/30">
          {game.category}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => onToggleFavorite(e, game.id)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorite 
              ? 'bg-rose-500 text-white' 
              : 'bg-slate-900/60 text-slate-300 hover:bg-slate-900 hover:text-rose-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
          {game.title}
        </h3>
        <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-1">
          {game.tags.map(tag => (
            <span key={tag} className="text-[10px] bg-slate-700/50 text-slate-400 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
