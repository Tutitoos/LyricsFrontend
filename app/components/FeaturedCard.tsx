interface FeaturedCardProps {
  title: string;
  artist: string;
  description: string;
  gradient: string;
  size?: 'large' | 'medium';
}

export default function FeaturedCard({ 
  title, 
  artist, 
  description, 
  gradient, 
  size = 'medium' 
}: FeaturedCardProps) {
  return (
    <div className={`featured-card ${size}`}>
      <div className="card-background" style={{ background: gradient }}>
        <div className="card-overlay"></div>
      </div>
      <div className="card-content">
        <div className="card-header">
          <span className="card-category">Destacado</span>
          <div className="play-button">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div className="card-info">
          <h3 className="card-title">{title}</h3>
          <p className="card-artist">{artist}</p>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </div>
  );
}
