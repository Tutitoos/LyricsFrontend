'use client';

import { useState, useEffect } from 'react';
import SearchInput from './components/SearchInput';
import LyricsCard from './components/LyricsCard';
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

  const handleLyricsClick = (item: LyricsItem) => {
    console.log('Opening lyrics for:', item.key);
  };

  return (
    <div className="simple-app">
      {/* Search Section */}
      <div className="search-header">
        <h1 className="app-title">LyricsHub</h1>
        <SearchInput onSearch={handleSearch} />
      </div>

      {/* Results */}
      <div className="lyrics-results">
        {searchQuery && (
          <div className="results-info">
            <p>Resultados para "{searchQuery}" - {filteredLyrics.length} encontrado{filteredLyrics.length !== 1 ? 's' : ''}</p>
          </div>
        )}

        {loading ? (
          <div className="loading-simple">
            <div className="loading-spinner"></div>
            <p>Cargando letras...</p>
          </div>
        ) : filteredLyrics.length === 0 ? (
          <div className="empty-simple">
            <h3>No se encontraron resultados</h3>
            <p>Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <div className="lyrics-grid-simple">
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
  );
}
