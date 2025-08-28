'use client';

import { useState } from 'react';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ currentSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Inicio', icon: '🏠' },
    { id: 'search', label: 'Buscar', icon: '🔍' },
    { id: 'popular', label: 'Populares', icon: '🔥' },
    { id: 'recent', label: 'Recientes', icon: '⏰' },
    { id: 'artists', label: 'Artistas', icon: '🎤' },
    { id: 'favorites', label: 'Favoritas', icon: '❤️' },
  ];

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Reggaeton', 'Indie', 'Electronic'
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="app-logo">
          <span className="logo-icon">♪</span>
          {!isCollapsed && <span className="logo-text">LyricsHub</span>}
        </div>
        <button 
          className="collapse-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentSection === item.id ? 'active' : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {!isCollapsed && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </div>

        {!isCollapsed && (
          <div className="nav-section">
            <h3 className="section-title">Géneros</h3>
            {genres.map((genre) => (
              <button
                key={genre}
                className="genre-item"
                onClick={() => onSectionChange(`genre-${genre.toLowerCase()}`)}
              >
                {genre}
              </button>
            ))}
          </div>
        )}
      </nav>

      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="user-section">
            <div className="user-avatar">
              <span>U</span>
            </div>
            <div className="user-info">
              <span className="user-name">Usuario</span>
              <span className="user-status">Letras guardadas: 42</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
