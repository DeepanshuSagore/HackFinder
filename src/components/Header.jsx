import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Compass, House, List, SquaresFour, X } from '@phosphor-icons/react';
import './HamburgerMenu.css';

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
          <div style={{ display: 'flex', alignItems: 'center', minHeight: '40px' }}>
            <h1 className="logo" style={{ margin: 0, padding: 0, lineHeight: 1, display: 'flex', alignItems: 'center' }}>
              <button type="button" className="logo__button" style={{ margin: 0, padding: 0, lineHeight: 1, display: 'flex', alignItems: 'center', background: 'none', border: 'none' }} onClick={handleGoHome} aria-label="Go to home">
                <span className="logo__text logo__text--full">HackFinder</span>
              </button>
            </h1>
          </div>
          <button
            type="button"
            className="nav-toggle"
            style={{ verticalAlign: 'middle', alignSelf: 'center', marginLeft: '16px' }}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="primaryNavigation"
          >
            <span className="sr-only">{isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}</span>
            {isMenuOpen ? <X size={22} weight="bold" aria-hidden="true" /> : <List size={22} weight="bold" aria-hidden="true" />}
          </button>
        </div>
        {/* Tagline below the row, not in flex row */}
        <div style={{ width: '100%', textAlign: 'left', marginTop: '2px' }}>
          <p className="tagline">Find Your Perfect Team</p>
        </div>
        {/* Rest of nav-cluster and user-menu below, unchanged */}
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
          <div className="hamburger-menu-dropdown">
            <button type="button" className="close-menu-btn" onClick={closeMenu}>
              <X size={24} weight="bold" />
            </button>
            
            <div className="user-profile-section">
              <img src={currentUser.avatar} alt={currentUser.name} className="dropdown-user-avatar" />
              <div className="dropdown-user-info">
                <h3 className="dropdown-user-name">{currentUser.name}</h3>
              </div>
            </div>
            
            <div className="menu-items">
              <button type="button" className="dropdown-menu-item" onClick={() => handleNavigate('dashboard')}>
                <House size={24} weight="bold" />
                Dashboard
              </button>
              <button type="button" className="dropdown-menu-item" onClick={() => handleNavigate('browse')}>
                <Compass size={24} weight="bold" />
                Browse
              </button>
              <button type="button" className="dropdown-menu-item" onClick={handleCreatePost}>
                <span className="icon-create-post">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Create Post
              </button>
            </div>
            
            <div className="dropdown-footer">
              <button type="button" className="dropdown-menu-item">
                <span className="icon-settings">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.4 15C19.1562 15.5537 19.2186 16.2097 19.5658 16.7008C19.913 17.1919 20.4975 17.4546 21.1 17.4L21.74 17.32C22.24 17.32 22.74 17.57 22.9801 18L23.97 19.77C24.22 20.21 24.1201 20.75 23.7801 21.16L23.3401 21.69C22.9308 22.1726 22.7936 22.8353 22.9771 23.4428C23.1606 24.0503 23.6445 24.5211 24.26 24.69L24.95 24.87C25.5 25.02 25.82 25.57 25.6801 26.13L25.0601 28.05C24.9301 28.61 24.4001 28.97 23.83 28.88L23.09 28.76C22.4813 28.6576 21.8609 28.8724 21.47 29.33C21.0792 29.7877 20.9729 30.4143 21.19 30.97L21.45 31.63C21.65 32.16 21.41 32.75 20.9 33.02L19.2 33.94C18.7 34.21 18.08 34.05 17.75 33.58L17.34 32.99C16.9692 32.4511 16.3348 32.1584 15.6882 32.2213C15.0416 32.2842 14.4786 32.6933 14.23 33.29L14 33.89C13.81 34.43 13.27 34.79 12.7 34.69L10.76 34.35C10.2 34.26 9.79 33.77 9.83 33.21L9.88 32.47C9.92627 31.8566 9.6491 31.2581 9.14 30.89C8.63089 30.5219 7.96909 30.431 7.38 30.65L6.74 30.87C6.2 31.05 5.59996 30.85 5.29996 30.36L4.29996 28.68C3.99996 28.18 4.11996 27.56 4.54996 27.21L5.09996 26.77C5.64539 26.3475 5.92261 25.6573 5.82908 24.9669C5.73556 24.2764 5.28568 23.6879 4.64996 23.45L4.01996 23.22C3.47996 23.03 3.17996 22.47 3.36996 21.92L3.99996 19.92C4.18996 19.37 4.75996 19.05 5.31996 19.19L5.99996 19.36C6.67333 19.5192 7.37418 19.3152 7.84996 18.82C8.32574 18.3247 8.50947 17.617 8.33996 16.95L8.17996 16.29C7.98996 15.74 8.24996 15.14 8.77996 14.9L10.62 14.15C11.15 13.91 11.75 14.11 12.04 14.6L12.38 15.23C12.7175 15.7878 13.3396 16.1498 14.0095 16.1992C14.6795 16.2486 15.3476 15.9798 15.77 15.48L16.18 14.97C16.57 14.48 17.2 14.32 17.74 14.56L19.6 15.41L19.4 15Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Settings
              </button>
            </div>
          </div>
        )}
        
        {isMenuOpen && (
          <div className="nav-overlay" onClick={closeMenu} aria-label="Close navigation" />
        )}
    </header>
  );
}Header.propTypes = {
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
