import { LyricsItem } from '../types/lyrics';

interface SectionGridProps {
  title: string;
  items: LyricsItem[];
  onItemClick: (item: LyricsItem) => void;
}

export default function SectionGrid({ title, items, onItemClick }: SectionGridProps) {
  return (
    <div className="section-grid">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <button className="see-all-button">
          Ver todo
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      <div className="grid-container">
        {items.slice(0, 6).map((item, index) => {
          const [artist, ...songParts] = item.key.split(' ');
          const song = songParts.join(' ');
          
          return (
            <div 
              key={item.ref}
              className="grid-item"
              onClick={() => onItemClick(item)}
            >
              <div className="item-artwork">
                <div className="artwork-placeholder">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                <div className="play-overlay">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="item-info">
                <h4 className="item-title">{song}</h4>
                <p className="item-artist">{artist}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
