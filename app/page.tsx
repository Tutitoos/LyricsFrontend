'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LyricsItem } from './types/lyrics';

export default function Home() {
  const router = useRouter();
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
        <div className="header-content">
          <h1 className="app-title">LyricsHub</h1>
          <p className="app-subtitle">
          Discover and explore song lyrics with innovative design
        </p>
          {lyrics.length > 0 && (
            <button
              onClick={fetchLyrics}
              className="refresh-button"
              disabled={loading}
              title="Reload lyrics"
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8.002 8.002 0 0115.356 2M15 15v5h-.582M3.644 12A8.001 8.001 0 0019.418 15m0 0v-5a8.002 8.002 0 00-15.356-2"
                />
              </svg>
              {loading ? 'Reloading...' : 'Reload'}
            </button>
          )}
        </div>
        
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
                placeholder="Search song lyrics..."
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
              Results for "{searchQuery}"
            </h2>
            <div className="results-count">
              {filteredLyrics.length} song{filteredLyrics.length !== 1 ? 's' : ''} found
            </div>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading lyrics...</p>
          </div>
        ) : lyrics.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎵</div>
            <h3 className="empty-title">Welcome to LyricsHub</h3>
            <p className="empty-description">
              Load the lyrics database to start exploring
            </p>
            <button
              onClick={fetchLyrics}
              className="load-button"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load lyrics'}
            </button>
          </div>
        ) : filteredLyrics.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">No results found</h3>
            <p className="empty-description">
              Try other search terms
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
                  aria-label={`View lyrics of ${song} by ${artist}`}
                >
                  <div className="card-header">
                    <div className="song-info">
                      <h3 className="song-title">{song}</h3>
                      <p className="artist-name">{artist}</p>
                    </div>
                    <button className="play-button" aria-label="Play">
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
                      <span>View complete lyrics</span>
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
