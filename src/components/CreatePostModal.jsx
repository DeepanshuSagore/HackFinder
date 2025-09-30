import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.jsx';

const EMPTY_FORM = {
  postType: '',
  title: '',
  description: '',
  techTags: '',
  rolesNeeded: '',
  desiredRoles: '',
  workPreference: 'remote',
  timeCommitment: '',
};

function CreatePostModal({ isOpen, onClose, onCreatePost }) {
  const [formState, setFormState] = useState(EMPTY_FORM);

  useEffect(() => {
    if (isOpen) {
      setFormState(EMPTY_FORM);
    }
  }, [isOpen]);

  const handleChange = (name) => (event) => {
    setFormState((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.postType || !formState.title || !formState.description) {
      return;
    }

    onCreatePost(formState);
  };

  const rolesLabel =
    formState.postType === 'team_seeking_members' ? 'Roles Needed (comma-separated)' : 'Desired Roles (comma-separated)';
  const showRolesNeeded = formState.postType === 'team_seeking_members';
  const showDesiredRoles = formState.postType === 'individual_seeking_team';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-header">
        <h3>Create New Post</h3>
        <button type="button" className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="modal-body">
        <form id="createPostForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="postType">
              Post Type
            </label>
            <select
              id="postType"
              className="form-control"
              value={formState.postType}
              onChange={handleChange('postType')}
              required
            >
              <option value="">Select post type</option>
              <option value="team_seeking_members">Team Seeking Members</option>
              <option value="individual_seeking_team">Individual Seeking Team</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="postTitle">
              Title
            </label>
            <input
              type="text"
              id="postTitle"
              className="form-control"
              value={formState.title}
              onChange={handleChange('title')}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="postDescription">
              Description
            </label>
            <textarea
              id="postDescription"
              className="form-control"
              rows={4}
              value={formState.description}
              onChange={handleChange('description')}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="postTechTags">
              Tech Stack (comma-separated)
            </label>
            <input
              type="text"
              id="postTechTags"
              className="form-control"
              placeholder="React, Node.js, Python"
              value={formState.techTags}
              onChange={handleChange('techTags')}
            />
          </div>

          {showRolesNeeded && (
            <div className="form-group">
              <label className="form-label" htmlFor="postRolesNeeded">
                {rolesLabel}
              </label>
              <input
                type="text"
                id="postRolesNeeded"
                className="form-control"
                placeholder="Frontend Developer, Backend Engineer"
                value={formState.rolesNeeded}
                onChange={handleChange('rolesNeeded')}
              />
            </div>
          )}

          {showDesiredRoles && (
            <div className="form-group">
              <label className="form-label" htmlFor="postDesiredRoles">
                {rolesLabel}
              </label>
              <input
                type="text"
                id="postDesiredRoles"
                className="form-control"
                placeholder="Frontend Developer, UI/UX Designer"
                value={formState.desiredRoles}
                onChange={handleChange('desiredRoles')}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="postWorkPreference">
              Work Preference
            </label>
            <select
              id="postWorkPreference"
              className="form-control"
              value={formState.workPreference}
              onChange={handleChange('workPreference')}
              required
            >
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="postTimeCommitment">
              Time Commitment
            </label>
            <input
              type="text"
              id="postTimeCommitment"
              className="form-control"
              placeholder="20+ hours/week"
              value={formState.timeCommitment}
              onChange={handleChange('timeCommitment')}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

CreatePostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreatePost: PropTypes.func.isRequired,
};

export default CreatePostModal;
