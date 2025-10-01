import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Compass, House, List, SquaresFour, X } from '@phosphor-icons/react';
import './HamburgerMenu.css';
import './DesktopNav.css';

const NAV_ITEMS = [
  { label: 'Home', value: 'home', icon: House },
  { label: 'Browse', value: 'browse', icon: Compass },
  { label: 'Dashboard', value: 'dashboard', icon: SquaresFour },
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

  const handleNavigate = (view) => {
    onViewChange(view);
    closeMenu();
  };

  const handleCreatePost = () => {
    onCreatePost();
    closeMenu();
  };

  const handleShowProfile = () => {
    onShowProfile();
    closeMenu();
  };

  const handleGoHome = () => {
    onViewChange('home');
    closeMenu();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="nav-wrapper" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h1 className="logo" style={{ margin: 0, padding: 0, lineHeight: 1, display: 'flex', alignItems: 'center' }}>
              <button type="button" className="logo__button" style={{ margin: 0, padding: 0, lineHeight: 1, display: 'flex', alignItems: 'center', background: 'none', border: 'none' }} onClick={handleGoHome} aria-label="Go to home">
                <span className="logo__text logo__text--full">HackFinder</span>
              </button>
            </h1>
            <p className="tagline" style={{ margin: '2px 0 0 0', padding: 0 }}>Find Your Perfect Team</p>
          </div>
          
          {/* Desktop navigation */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <nav className="desktop-nav-menu" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.value}
                    type="button"
                    className={`desktop-nav-btn ${currentView === item.value ? 'active' : ''}`}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '5px',
                      padding: '8px 16px',
                      background: currentView === item.value ? 'var(--color-primary)' : 'transparent',
                      color: currentView === item.value ? 'var(--color-white)' : 'var(--color-text)',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleNavigate(item.value)}
                  >
                    <Icon size={18} weight="bold" aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button 
                type="button" 
                className="create-post-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '8px 16px',
                  background: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                onClick={handleCreatePost}
              >
                + Create Post
              </button>
            </nav>
            
            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={handleShowProfile}>
              <img src={currentUser.avatar} alt={currentUser.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
              <span>{currentUser.name}</span>
            </div>
            
            {/* Mobile menu toggle */}
            <button
              type="button"
              className="nav-toggle"
              style={{ 
                verticalAlign: 'middle',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="primaryNavigation"
            >
              <span className="sr-only">{isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}</span>
              {isMenuOpen ? <X size={22} weight="bold" aria-hidden="true" /> : <List size={22} weight="bold" aria-hidden="true" />}
            </button>
          </div>
        </div>
        
        {/* Mobile nav-cluster below */}
        <div className={`nav-cluster ${isMenuOpen ? 'nav-cluster--open' : ''}`}> 
          <nav id="primaryNavigation" className="nav-menu">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.value}
                  type="button"
                  className={`nav-btn ${currentView === item.value ? 'active' : ''}`}
                  onClick={() => handleNavigate(item.value)}
                >
                  <Icon size={18} weight="bold" aria-hidden="true" />
                  <span className="nav-btn__label">{item.label}</span>
                </button>
              );
            })}
            <button type="button" className="nav-btn nav-btn--cta" onClick={handleCreatePost}>
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
                onClick={handleShowProfile}
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>
        {isMenuOpen && (
          <div className="nav-overlay" onClick={closeMenu} aria-label="Close navigation" />
        )}
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
