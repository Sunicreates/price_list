import React from 'react';

const LANG_FLAGS = {
  sv: 'https://storage.123fakturere.no/public/flags/SE.png',
  en: 'https://storage.123fakturere.no/public/flags/GB.png',
};

export default function Header({ lang, setLang, avatarUrl, userName = 'John Andre', companyName = 'Storfjord AS', onToggleSidebar, sidebarOpen }) {
  const initials = userName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join('');

  return (
    <header className="header">
      <button
        className="hamburger"
        aria-label="Toggle menu"
        aria-expanded={sidebarOpen ? 'true' : 'false'}
        onClick={onToggleSidebar}
      >
        <span />
        <span />
        <span />
      </button>
      <div className="user-info">
        {avatarUrl ? (
          <img src={avatarUrl} alt={userName} className="avatar" />
        ) : (
          <div className="avatar avatar--placeholder" aria-label={userName} title={userName}>
            {initials}
          </div>
        )}
  <span className="user-name-text">{userName}</span>
  <span className="company-name-text">{companyName}</span>
      </div>
      <div className="lang-selector">
        <img
          src={LANG_FLAGS[lang]}
          alt={lang}
          style={{ width: 32, cursor: 'pointer' }}
          onClick={() => setLang(lang === 'en' ? 'sv' : 'en')}
        />
      </div>
    </header>
  );
}
