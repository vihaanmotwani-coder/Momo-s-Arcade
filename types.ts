
export type Category = 'All' | 'Action' | 'Puzzle' | 'Strategy' | 'Sports' | 'Retro' | 'Favorites';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: Category;
  tags: string[];
}
