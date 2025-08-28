import { LyricsItem } from '../types/lyrics';

interface LyricsCardProps {
  lyrics: LyricsItem;
  onClick?: () => void;
}

export default function LyricsCard({ lyrics, onClick }: LyricsCardProps) {
  // Extract artist and song from the key
  const [artist, ...songParts] = lyrics.key.split(' ');
  const song = songParts.join(' ');
  
  // Truncate lyrics for preview
  const previewText = lyrics.value.length > 150 
    ? lyrics.value.substring(0, 150) + '...' 
    : lyrics.value;

  return (
    <div 
      className="lyrics-card"
      onClick={onClick}
    >
      <div className="lyrics-card-header">
        <div className="lyrics-card-icon">
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        <div className="lyrics-card-title">
          <h3 className="song-title">{song}</h3>
          <p className="artist-name">{artist}</p>
        </div>
      </div>
      
      <div className="lyrics-preview">
        <p className="lyrics-text">
          {previewText.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < previewText.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
      
      <div className="lyrics-card-footer">
        <div className="view-more">
          <span>Ver letras completas</span>
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
