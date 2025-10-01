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
              aria-controls="mobileNavigation"
            >
              <span className="sr-only">{isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}</span>
              {isMenuOpen ? <X size={22} weight="bold" aria-hidden="true" /> : <List size={22} weight="bold" aria-hidden="true" />}
            </button>
          </div>
        </div>
        
      </div>
        {isMenuOpen && (
          <div className="hamburger-menu-dropdown">
            <button type="button" className="close-menu-btn" onClick={closeMenu}>
              <X size={24} weight="bold" />
            </button>
            
            <button
              type="button"
              className="user-profile-section"
              onClick={handleShowProfile}
            >
              <img src={currentUser.avatar} alt={currentUser.name} className="dropdown-user-avatar" />
              <div className="dropdown-user-info">
                <h3 className="dropdown-user-name">{currentUser.name}</h3>
              </div>
            </button>
            
            <nav id="mobileNavigation" className="menu-items" aria-label="Primary navigation">
              <button type="button" className="dropdown-menu-item" onClick={() => handleNavigate('browse')}>
                <Compass size={24} weight="bold" />
                Browse
              </button>
              <button type="button" className="dropdown-menu-item" onClick={() => handleNavigate('dashboard')}>
                <SquaresFour size={24} weight="bold" />
                Dashboard
              </button>
              <button type="button" className="dropdown-menu-item" onClick={handleCreatePost}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Create Post
              </button>
            </nav>
            
            <div className="dropdown-footer">
              <button type="button" className="dropdown-menu-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19.4 15.05C19.2669 15.3146 19.2272 15.6148 19.287 15.9043C19.3468 16.1937 19.5034 16.4563 19.73 16.65L19.79 16.7C19.976 16.8863 20.1235 17.1113 20.2241 17.361C20.3248 17.6108 20.3766 17.8802 20.3766 18.1525C20.3766 18.4248 20.3248 18.6942 20.2241 18.944C20.1235 19.1937 19.976 19.4187 19.79 19.605C19.6037 19.791 19.3787 19.9385 19.129 20.0391C18.8792 20.1398 18.6098 20.1916 18.3375 20.1916C18.0652 20.1916 17.7958 20.1398 17.546 20.0391C17.2963 19.9385 17.0713 19.791 16.885 19.605L16.835 19.555C16.6414 19.3284 16.3788 19.1718 16.0893 19.112C15.7998 19.0522 15.4996 19.0919 15.235 19.225C14.9765 19.3508 14.7642 19.5565 14.6238 19.8132C14.4834 20.0699 14.4218 20.3651 14.448 20.66V20.8C14.448 21.3504 14.2294 21.8784 13.8401 22.2678C13.4508 22.6571 12.9228 22.8757 12.3724 22.8757C11.8219 22.8757 11.294 22.6571 10.9046 22.2678C10.5153 21.8784 10.2967 21.3504 10.2967 20.8V20.71C10.3192 20.4043 10.2501 20.0994 10.0981 19.8359C9.94608 19.5724 9.71864 19.3647 9.44995 19.24C9.18536 19.1069 8.88515 19.0672 8.59563 19.127C8.3061 19.1868 8.04355 19.3434 7.84995 19.57L7.78995 19.63C7.60369 19.816 7.37866 19.9635 7.12893 20.0641C6.8792 20.1648 6.60979 20.2166 6.33745 20.2166C6.06511 20.2166 5.7957 20.1648 5.54597 20.0641C5.29624 19.9635 5.07122 19.816 4.88495 19.63C4.69889 19.4437 4.55144 19.2187 4.45077 18.969C4.3501 18.7192 4.29832 18.4498 4.29832 18.1775C4.29832 17.9052 4.3501 17.6358 4.45077 17.386C4.55144 17.1363 4.69889 16.9113 4.88495 16.725L4.93495 16.675C5.16151 16.4814 5.31814 16.2188 5.37795 15.9293C5.43776 15.6398 5.39802 15.3396 5.26495 15.075C5.13916 14.8165 4.93344 14.6042 4.67678 14.4638C4.42013 14.3234 4.12488 14.2618 3.82995 14.288H3.68995C3.13952 14.288 2.61156 14.0694 2.22224 13.6801C1.83291 13.2908 1.61432 12.7628 1.61432 12.2124C1.61432 11.6619 1.83291 11.1339 2.22224 10.7446C2.61156 10.3553 3.13952 10.1367 3.68995 10.1367H3.77995C4.08565 10.1592 4.39059 10.0901 4.6541 9.93808C4.91761 9.78603 5.12532 9.5586 5.24995 9.28997C5.38303 9.02539 5.42277 8.72517 5.36296 8.43565C5.30315 8.14613 5.14651 7.88358 4.91995 7.68997L4.85995 7.62997C4.67389 7.44371 4.52644 7.21868 4.42577 6.96895C4.3251 6.71922 4.27332 6.44981 4.27332 6.17747C4.27332 5.90513 4.3251 5.63572 4.42577 5.38599C4.52644 5.13626 4.67389 4.91124 4.85995 4.72497C5.04622 4.53891 5.27124 4.39147 5.52097 4.2908C5.7707 4.19013 6.04011 4.13835 6.31245 4.13835C6.58479 4.13835 6.8542 4.19013 7.10393 4.2908C7.35366 4.39147 7.57869 4.53891 7.76495 4.72497L7.81495 4.77497C8.00857 5.00153 8.27111 5.15817 8.56064 5.21798C8.85016 5.27779 9.15037 5.23805 9.41495 5.10497H9.44995C9.70851 4.97919 9.92078 4.77346 10.0612 4.51681C10.2016 4.26016 10.2632 3.96491 10.2367 3.66997V3.52997C10.2367 2.97955 10.4553 2.45158 10.8446 2.06226C11.2339 1.67294 11.7619 1.45435 12.3124 1.45435C12.8628 1.45435 13.3907 1.67294 13.7801 2.06226C14.1694 2.45158 14.388 2.97955 14.388 3.52997V3.61997C14.3645 3.91568 14.4336 4.22062 14.5856 4.48412C14.7377 4.74763 14.9651 4.95534 15.2337 5.07997C15.4983 5.21305 15.7985 5.25279 16.088 5.19298C16.3776 5.13317 16.6401 4.97653 16.8337 4.74997L16.8937 4.68997C17.08 4.50391 17.305 4.35647 17.5547 4.2558C17.8045 4.15513 18.0739 4.10335 18.3462 4.10335C18.6186 4.10335 18.888 4.15513 19.1377 4.2558C19.3875 4.35647 19.6125 4.50391 19.7987 4.68997C19.9848 4.87624 20.1322 5.10126 20.2329 5.35099C20.3336 5.60072 20.3853 5.87013 20.3853 6.14247C20.3853 6.41481 20.3336 6.68422 20.2329 6.93395C20.1322 7.18368 19.9848 7.4087 19.7987 7.59497L19.7487 7.64497C19.5222 7.83858 19.3655 8.10113 19.3057 8.39065C19.2459 8.68017 19.2856 8.98039 19.4187 9.24497V9.27997C19.5445 9.53853 19.7502 9.7508 20.0069 9.89116C20.2635 10.0315 20.5588 10.0932 20.8537 10.0667H20.9937C21.5441 10.0667 22.0721 10.2853 22.4614 10.6746C22.8507 11.0639 23.0693 11.5919 23.0693 12.1424C23.0693 12.6928 22.8507 13.2207 22.4614 13.6101C22.0721 13.9994 21.5441 14.218 20.9937 14.218H20.9037C20.6079 14.2415 20.303 14.3106 20.0395 14.4626C19.776 14.6147 19.5683 14.8421 19.4437 15.1107L19.4 15.05Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
