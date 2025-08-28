'use client';

import { useState, useEffect } from 'react';
import SearchInput from './components/SearchInput';
import LyricsCard from './components/LyricsCard';
import { LyricsItem } from './types/lyrics';

// Sample placeholder data structure (avoiding copyrighted content)
const sampleLyrics: LyricsItem[] = [
  {
    ref: "sample-1",
    key: "Artist Song Title",
    value: "Sample lyrics preview text here...\nThis is placeholder content\nTo demonstrate the layout"
  },
  {
    ref: "sample-2", 
    key: "Another Artist Song",
    value: "Another sample preview...\nShowing multiple lines\nOf placeholder text"
  }
];

export default function Home() {
  const [lyrics, setLyrics] = useState<LyricsItem[]>([]);
  const [filteredLyrics, setFilteredLyrics] = useState<LyricsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLyrics();
  }, []);

  const fetchLyrics = async () => {
    try {
      setLoading(true);
      // In production, this would fetch from the actual API
      // const response = await fetch('https://lyrics.kenabot.xyz/v1/lyrics/all');
      // const data = await response.json();
      // setLyrics(data.data);
      
      // Using sample data for demonstration
      setLyrics(sampleLyrics);
      setFilteredLyrics(sampleLyrics);
    } catch (error) {
      console.error('Error fetching lyrics:', error);
      setLyrics(sampleLyrics);
      setFilteredLyrics(sampleLyrics);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredLyrics(lyrics);
      return;
    }

    const filtered = lyrics.filter(
      (item) =>
        item.key.toLowerCase().includes(query.toLowerCase()) ||
        item.value.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLyrics(filtered);
  };

  const handleLyricsClick = (lyricsItem: LyricsItem) => {
    // In a real app, this would open a modal or navigate to detail page
    console.log('Opening lyrics for:', lyricsItem.key);
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">
            <span className="title-primary">Lyrics</span>
            <span className="title-secondary">Hub</span>
          </h1>
          <p className="main-subtitle">
            Descubre y explora letras de canciones con un diseño moderno
          </p>
          
          <div className="search-section">
            <SearchInput onSearch={handleSearch} />
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="hero-decoration">
          <div className="floating-note note-1">♪</div>
          <div className="floating-note note-2">♫</div>
          <div className="floating-note note-3">♪</div>
        </div>
      </div>

      {/* Results Section */}
      <div className="results-section">
        <div className="results-container">
          {searchQuery && (
            <div className="results-header">
              <h2 className="results-title">
                Resultados para "{searchQuery}"
              </h2>
              <span className="results-count">
                {filteredLyrics.length} canción{filteredLyrics.length !== 1 ? 'es' : ''} encontrada{filteredLyrics.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Cargando letras...</p>
            </div>
          ) : filteredLyrics.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎵</div>
              <h3>No se encontraron resultados</h3>
              <p>Intenta con otros términos de búsqueda</p>
            </div>
          ) : (
            <div className="lyrics-grid">
              {filteredLyrics.map((lyricsItem) => (
                <LyricsCard
                  key={lyricsItem.ref}
                  lyrics={lyricsItem}
                  onClick={() => handleLyricsClick(lyricsItem)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
