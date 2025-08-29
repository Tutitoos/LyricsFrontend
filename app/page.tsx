'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LyricsItem } from './types/lyrics';

export default function Home() {
  const router = useRouter();
  const [lyrics, setLyrics] = useState<LyricsItem[]>([]);
  const [filteredLyrics, setFilteredLyrics] = useState<LyricsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLyrics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/lyrics');
      const data = await response.json();

      if (data.error || !data.data || data.data.length === 0) {
        setLyrics([]);
        setFilteredLyrics([]);
        return;
      }

      setLyrics(data.data);
      setFilteredLyrics(data.data);
    } catch (error) {
      console.error('Error fetching lyrics:', error);
      setLyrics([]);
      setFilteredLyrics([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
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

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredLyrics(lyrics);
  };

  const handleLyricsClick = (item: LyricsItem) => {
    // Navigate to individual song page
    router.push(`/lyrics/${encodeURIComponent(item.ref)}`);
  };

  return (
    <div className="modern-app">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">LyricsHub</h1>
        <p className="app-subtitle">
          Descubre y explora letras de canciones con un diseño innovador
        </p>
        
        {/* Search */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg
                className="search-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Buscar letras de canciones..."
                className="search-input"
              />
              <button
                onClick={clearSearch}
                className="clear-button"
                type="button"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="results-section">
        {searchQuery && (
          <div className="results-header">
            <h2 className="results-title">
              Resultados para "{searchQuery}"
            </h2>
            <div className="results-count">
              {filteredLyrics.length} canción{filteredLyrics.length !== 1 ? 'es' : ''} encontrada{filteredLyrics.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p className="loading-text">Cargando letras...</p>
          </div>
        ) : lyrics.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎵</div>
            <h3 className="empty-title">Bienvenido a LyricsHub</h3>
            <p className="empty-description">
              Carga la base de datos de letras para comenzar a explorar
            </p>
            <button
              onClick={fetchLyrics}
              className="load-button"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Cargar letras'}
            </button>
          </div>
        ) : filteredLyrics.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">No se encontraron resultados</h3>
            <p className="empty-description">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        ) : (
          <div className="lyrics-grid">
            {filteredLyrics.map((lyricsItem, index) => {
              const [artist, ...songParts] = lyricsItem.key.split(' ');
              const song = songParts.join(' ');
              
              return (
                <article
                  key={lyricsItem.ref}
                  className="lyrics-card"
                  onClick={() => handleLyricsClick(lyricsItem)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Ver letras de ${song} por ${artist}`}
                >
                  <div className="card-header">
                    <div className="song-info">
                      <h3 className="song-title">{song}</h3>
                      <p className="artist-name">{artist}</p>
                    </div>
                    <button className="play-button" aria-label="Reproducir">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="lyrics-preview">
                    <p className="lyrics-text">
                      {lyricsItem.value.length > 200
                        ? lyricsItem.value.substring(0, 200) + '...'
                        : lyricsItem.value
                      }
                    </p>
                  </div>
                  
                  <div className="card-footer">
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
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
