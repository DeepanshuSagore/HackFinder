import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import githubLogo from '../assets/github.png';
import linkedinLogo from '../assets/linkedin.png';
import Modal from './Modal.jsx';

function ProfileModal({ isOpen, onClose, user = null, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    bio: '',
    location: '',
    skills: '',
    roles: '',
    experience: '',
    github: '',
    linkedin: '',
  });

  const createFormStateFromUser = (profile) => ({
    name: profile?.name ?? '',
    bio: profile?.bio ?? '',
    location: profile?.location ?? '',
    skills: (profile?.skills ?? []).join(', '),
    roles: (profile?.roles ?? []).join(', '),
    experience: profile?.experience ?? '',
    github: profile?.github ?? '',
    linkedin: profile?.linkedin ?? '',
  });

  useEffect(() => {
    if (user && isOpen) {
      setFormState(createFormStateFromUser(user));
    }
  }, [user, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
    }
  }, [isOpen]);

  if (!user) return null;

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  const handleInputChange = (field) => (event) => {
    const { value } = event.target;
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const parseList = (value) =>
    value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user || !onUpdateProfile) return;

    const updatedProfile = {
      ...user,
      name: formState.name.trim() || user.name,
      bio: formState.bio.trim(),
      location: formState.location.trim(),
      skills: parseList(formState.skills),
      roles: parseList(formState.roles),
      experience: formState.experience.trim(),
      github: formState.github.trim(),
      linkedin: formState.linkedin.trim(),
    };

    onUpdateProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setFormState(createFormStateFromUser(user));
    setIsEditing(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="modal-header">
        <h3>Your Profile</h3>
        <button type="button" className="modal-close" onClick={handleClose}>
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
              {user.verified ? (
                <div className="status status--verified">
                  <span aria-hidden="true" className="status__icon">
                    ✓
                  </span>
                  <span className="status__label">Verified</span>
                </div>
              ) : null}
            </div>
          </div>
          {isEditing ? (
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="profileName">
                  Full Name
                </label>
                <input
                  id="profileName"
                  type="text"
                  className="form-control"
                  value={formState.name}
                  onChange={handleInputChange('name')}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="profileBio">
                  Bio
                </label>
                <textarea
                  id="profileBio"
                  className="form-control"
                  rows={3}
                  value={formState.bio}
                  onChange={handleInputChange('bio')}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="profileLocation">
                  Location
                </label>
                <input
                  id="profileLocation"
                  type="text"
                  className="form-control"
                  value={formState.location}
                  onChange={handleInputChange('location')}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="profileSkills">
                  Skills (comma-separated)
                </label>
                <input
                  id="profileSkills"
                  type="text"
                  className="form-control"
                  value={formState.skills}
                  onChange={handleInputChange('skills')}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="profileRoles">
                  Preferred Roles (comma-separated)
                </label>
                <input
                  id="profileRoles"
                  type="text"
                  className="form-control"
                  value={formState.roles}
                  onChange={handleInputChange('roles')}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="profileExperience">
                  Experience Level
                </label>
                <input
                  id="profileExperience"
                  type="text"
                  className="form-control"
                  value={formState.experience}
                  onChange={handleInputChange('experience')}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="profileGithub">
                  GitHub URL (without https://)
                </label>
                <input
                  id="profileGithub"
                  type="text"
                  className="form-control"
                  placeholder="github.com/username"
                  value={formState.github}
                  onChange={handleInputChange('github')}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="profileLinkedIn">
                  LinkedIn URL (without https://)
                </label>
                <input
                  id="profileLinkedIn"
                  type="text"
                  className="form-control"
                  placeholder="linkedin.com/in/username"
                  value={formState.linkedin}
                  onChange={handleInputChange('linkedin')}
                />
              </div>

              <div className="modal-footer profile-edit-actions">
                <button type="button" className="btn btn--secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <>
              {onUpdateProfile ? (
                <div className="profile-actions">
                  <button
                    type="button"
                    className="btn btn--secondary btn--sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              ) : null}

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

              {user.location ? (
                <div className="profile-section">
                  <h5>Location</h5>
                  <p>{user.location}</p>
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
            </>
          )}
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
    github: PropTypes.string,
    linkedin: PropTypes.string,
    verified: PropTypes.bool,
  }),
  onUpdateProfile: PropTypes.func,
};

export default ProfileModal;
