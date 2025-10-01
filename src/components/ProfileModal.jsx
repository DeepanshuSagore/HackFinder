import PropTypes from 'prop-types';
import githubLogo from '../assets/github.png';
import linkedinLogo from '../assets/linkedin.png';
import Modal from './Modal.jsx';

function ProfileModal({ isOpen, onClose, user = null }) {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-header">
        <h3>Your Profile</h3>
        <button type="button" className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="modal-body">
        <div className="profile-content">
          <div className="profile-header">
            <img src={user.avatar} alt={user.name} className="profile-avatar" />
            <div className="profile-info">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              {user.verified ? <div className="status verified">Verified</div> : null}
            </div>
          </div>

          {user.bio ? (
            <div className="profile-section">
              <h5>Bio</h5>
              <p>{user.bio}</p>
            </div>
          ) : null}

          {user.skills?.length ? (
            <div className="profile-section">
              <h5>Skills</h5>
              <div className="tags-list">
                {user.skills.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {user.roles?.length ? (
            <div className="profile-section">
              <h5>Preferred Roles</h5>
              <div className="tags-list">
                {user.roles.map((role) => (
                  <span key={role} className="tag">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {user.experience ? (
            <div className="profile-section">
              <h5>Experience</h5>
              <span className="status status--info">{user.experience}</span>
            </div>
          ) : null}

          {(user.location || user.timezone) ? (
            <div className="profile-section">
              <h5>Location &amp; Timezone</h5>
              <p>
                {user.location}
                {user.timezone ? ` (${user.timezone})` : ''}
              </p>
            </div>
          ) : null}

          {user.github || user.linkedin ? (
            <div className="profile-section">
              <h5>Links</h5>
              <div className="profile-links">
                {user.github ? (
                  <a href={`https://${user.github}`} target="_blank" rel="noreferrer" className="link-item">
                    <img src={githubLogo} alt="GitHub" className="link-item__icon" />
                    <span>GitHub</span>
                  </a>
                ) : null}
                {user.linkedin ? (
                  <a
                    href={`https://${user.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="link-item"
                  >
                    <img src={linkedinLogo} alt="LinkedIn" className="link-item__icon" />
                    <span>LinkedIn</span>
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

ProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    bio: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    roles: PropTypes.arrayOf(PropTypes.string),
    experience: PropTypes.string,
    location: PropTypes.string,
    timezone: PropTypes.string,
    github: PropTypes.string,
    linkedin: PropTypes.string,
    verified: PropTypes.bool,
  }),
};

export default ProfileModal;
