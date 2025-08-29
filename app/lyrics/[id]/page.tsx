'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LyricsItem } from '../../types/lyrics';

export default function LyricsPage() {
  const params = useParams();
  const router = useRouter();
  const [lyricsItem, setLyricsItem] = useState<LyricsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchLyricsById(params.id as string);
    }
  }, [params.id]);

  const fetchLyricsById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/lyrics');
      const data = await response.json();
      
      if (data.error || !data.data) {
        throw new Error(data.error || 'No lyrics data received');
      }

      const foundLyrics = data.data.find((item: LyricsItem) => item.ref === decodeURIComponent(id));
      
      if (!foundLyrics) {
        throw new Error('Lyrics not found');
      }
      
      setLyricsItem(foundLyrics);
    } catch (error) {
      console.error('Error fetching lyrics:', error);
      setError(error instanceof Error ? error.message : 'Error loading lyrics');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="lyrics-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading lyrics...</p>
        </div>
      </div>
    );
  }

  if (error || !lyricsItem) {
    return (
      <div className="lyrics-page">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Error</h2>
          <p className="error-description">{error || 'Lyrics not found'}</p>
          <button onClick={handleBack} className="back-button">
            Back
          </button>
        </div>
      </div>
    );
  }

  const [artist, ...songParts] = lyricsItem.key.split(' ');
  const song = songParts.join(' ');

  return (
    <div className="lyrics-page">
      <div className="lyrics-container">
        {/* Header */}
        <div className="lyrics-header">
          <button onClick={handleBack} className="back-button">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          
          <div className="song-header">
            <div className="song-artwork">
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-12 h-12"
              >
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <div className="song-info">
              <h1 className="song-title">{song}</h1>
              <p className="artist-name">{artist}</p>
            </div>
          </div>
        </div>

        {/* Lyrics Content */}
        <div className="lyrics-content">
          <div className="lyrics-text-container">
            <pre className="lyrics-text-full">
              {lyricsItem.value}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
