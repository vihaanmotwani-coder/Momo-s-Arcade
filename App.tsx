
import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Trophy, Flame } from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import GameCard from './components/GameCard.tsx';
import GameView from './components/GameView.tsx';
import Footer from './components/Footer.tsx';
import { Game, Category } from './types.ts';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  // Load games from JSON file
  useEffect(() => {
    fetch('./games.json')
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load games database", err);
        setLoading(false);
      });
  }, []);

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('momo-favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem('momo-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === 'All' || 
                             (activeCategory === 'Favorites' ? favorites.includes(game.id) : game.category === activeCategory);

      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, activeCategory, favorites]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="font-orbitron text-indigo-400 tracking-widest text-sm animate-pulse">BOOTING MOMO'S ARCADE...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero / Featured section (Only on "All" category) */}
        {activeCategory === 'All' && !searchQuery && (
          <section className="mb-12">
            <div className="relative overflow-hidden rounded-3xl bg-indigo-600 p-8 md:p-12">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50" />
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-4 bg-indigo-500/30 w-fit px-3 py-1 rounded-full border border-indigo-400/30">
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Featured Game</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black font-orbitron mb-4 leading-tight">GEOMETRY DASH LITE</h2>
                <p className="text-indigo-100 mb-8 text-lg opacity-90 leading-relaxed">
                  The ultimate rhythm platformer is now unblocked. Dash through obstacles, flip gravity, and beat the beat in high-speed action.
                </p>
                <button 
                  onClick={() => setSelectedGame(games.find(g => g.id === 'geometry-dash') || null)}
                  className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-xl shadow-indigo-900/20"
                >
                  <Trophy className="w-5 h-5" />
                  Play Now
                </button>
              </div>
              {/* Mock Floating Elements */}
              <div className="absolute right-12 bottom-0 hidden lg:block translate-y-4">
                 <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl animate-bounce duration-[2000ms]">
                   <Flame className="w-12 h-12 text-orange-400" />
                 </div>
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Title */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black font-orbitron tracking-tight flex items-center gap-3 uppercase">
            {activeCategory} {searchQuery ? `results for "${searchQuery}"` : 'Games'}
            <span className="text-sm font-medium text-slate-500 font-sans tracking-normal lowercase ml-2">
              ({filteredGames.length})
            </span>
          </h2>
        </div>

        {/* Game Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={toggleFavorite}
                onSelectGame={setSelectedGame}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mb-6">
               <div className="text-6xl mb-4">👾</div>
               <h3 className="text-xl font-bold mb-2">No games found!</h3>
               <p className="text-slate-400 max-w-xs">
                 We couldn't find any games matching your current filters. Try searching for something else or browse another category.
               </p>
            </div>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="text-indigo-400 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <Footer />

      {/* Game Modal / View Overlay */}
      <GameView 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </div>
  );
};

export default App;
