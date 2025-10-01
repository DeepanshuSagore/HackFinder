import PropTypes from 'prop-types';
import { RocketLaunch } from '@phosphor-icons/react';

const NAV_ITEMS = [
  { label: 'Home', value: 'home' },
  { label: 'Browse', value: 'browse' },
  { label: 'Dashboard', value: 'dashboard' },
];

function Header({ currentView, onViewChange, onCreatePost, onShowProfile, currentUser }) {
  return (
    <header className="header">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo-section">
            <h1 className="logo">
              <RocketLaunch className="logo__icon" weight="fill" size={26} aria-hidden="true" />
              HackFinder
            </h1>
            <p className="tagline">Find Your Perfect Team</p>
          </div>

          <nav className="nav-menu">
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
