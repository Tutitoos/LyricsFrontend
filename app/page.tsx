'use client';

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import FeaturedCard from './components/FeaturedCard';
import SectionGrid from './components/SectionGrid';
import SearchInput from './components/SearchInput';
import { LyricsItem } from './types/lyrics';

// Sample data for demonstration (avoiding copyrighted content)
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
  },
  {
    ref: "sample-3",
    key: "Example Singer Track",
    value: "Example lyrics content...\nMultiple lines for demo\nPurposes only"
  },
  {
    ref: "sample-4",
    key: "Demo Artist Music",
    value: "Demo lyrics text...\nFor layout demonstration\nNon-copyrighted content"
  },
  {
    ref: "sample-5",
    key: "Sample Band Melody",
    value: "Sample text for lyrics...\nShowing grid layout\nPlaceholder content"
  },
  {
    ref: "sample-6",
    key: "Test Singer Tune",
    value: "Test lyrics content...\nFor design purposes\nExample text only"
  }
];

export default function Home() {
  const [currentSection, setCurrentSection] = useState('home');
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
      // In production: const response = await fetch('https://lyrics.kenabot.xyz/v1/lyrics/all');
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

  const handleItemClick = (item: LyricsItem) => {
    console.log('Opening lyrics for:', item.key);
  };

  const renderContent = () => {
    if (currentSection === 'search') {
      return (
        <div className="search-page">
          <div className="search-header">
            <h1>Buscar Letras</h1>
            <SearchInput onSearch={handleSearch} />
          </div>
          
          {searchQuery && (
            <div className="search-results">
              <h2>Resultados para "{searchQuery}"</h2>
              <div className="search-grid">
                {filteredLyrics.map((item) => {
                  const [artist, ...songParts] = item.key.split(' ');
                  const song = songParts.join(' ');
                  
                  return (
                    <div key={item.ref} className="search-result-item" onClick={() => handleItemClick(item)}>
                      <div className="result-artwork">
                        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      </div>
                      <div className="result-info">
                        <h4>{song}</h4>
                        <p>{artist}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="home-content">
        {/* Hero Section */}
        <div className="hero-section-apple">
          <h1 className="page-title">Descubre Letras</h1>
          <div className="featured-cards">
            <FeaturedCard
              title="Destacado del Día"
              artist="Artista Popular"
              description="Las letras más buscadas hoy"
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              size="large"
            />
            <FeaturedCard
              title="Trending"
              artist="Nuevo Artista"
              description="Lo más popular esta semana"
              gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            />
            <FeaturedCard
              title="Clásicos"
              artist="Leyendas"
              description="Letras inmortales"
              gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            />
          </div>
        </div>

        {/* Content Sections */}
        <div className="content-sections">
          <SectionGrid
            title="Letras Populares"
            items={lyrics.slice(0, 6)}
            onItemClick={handleItemClick}
          />
          
          <SectionGrid
            title="Agregadas Recientemente"
            items={lyrics.slice(2, 8)}
            onItemClick={handleItemClick}
          />
          
          <SectionGrid
            title="Artistas Destacados"
            items={lyrics.slice(1, 7)}
            onItemClick={handleItemClick}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="app-layout">
      <Sidebar 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />
      <main className="main-content">
        {loading ? (
          <div className="loading-state-apple">
            <div className="loading-spinner"></div>
            <p>Cargando letras...</p>
          </div>
        ) : (
          renderContent()
        )}
      </main>
    </div>
  );
}
