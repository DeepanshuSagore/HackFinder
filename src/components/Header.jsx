import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { List, RocketLaunch, X } from '@phosphor-icons/react';

const NAV_ITEMS = [
  { label: 'Home', value: 'home' },
  { label: 'Browse', value: 'browse' },
  { label: 'Dashboard', value: 'dashboard' },
];

function Header({ currentView, onViewChange, onCreatePost, onShowProfile, currentUser }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentView]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className={`nav-wrapper ${isMenuOpen ? 'nav-wrapper--open' : ''}`}>
          <div className="logo-section">
            <h1 className="logo">
              <RocketLaunch className="logo__icon" weight="fill" size={26} aria-hidden="true" />
              HackFinder
            </h1>
            <p className="tagline">Find Your Perfect Team</p>
          </div>
          <button
            type="button"
            className="nav-toggle"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="primaryNavigation"
          >
            <span className="sr-only">{isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}</span>
            {isMenuOpen ? <X size={22} weight="bold" aria-hidden="true" /> : <List size={22} weight="bold" aria-hidden="true" />}
          </button>

          <div className={`nav-cluster ${isMenuOpen ? 'nav-cluster--open' : ''}`}>
            <nav id="primaryNavigation" className="nav-menu">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={`nav-btn ${currentView === item.value ? 'active' : ''}`}
                  onClick={() => onViewChange(item.value)}
                >
                  {item.label}
                </button>
              ))}
              <button type="button" className="nav-btn nav-btn--cta" onClick={onCreatePost}>
                + Create Post
              </button>
            </nav>

            <div className="user-menu">
              <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
              <div className="user-menu__details">
                <span className="user-name">{currentUser.name}</span>
                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  onClick={onShowProfile}
                >
                  Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen ? (
        <button type="button" className="nav-overlay" onClick={closeMenu} aria-label="Close navigation" />
      ) : null}
    </header>
  );
}

Header.propTypes = {
  currentView: PropTypes.oneOf(['home', 'browse', 'dashboard']).isRequired,
  onViewChange: PropTypes.func.isRequired,
  onCreatePost: PropTypes.func.isRequired,
  onShowProfile: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
