import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.jsx';

function PostDetailModal({
  post = null,
  isOpen,
  onClose,
  onExpressInterest,
  existingInterest = null,
  isOwner,
}) {
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const roles = useMemo(
    () => (post?.type === 'team_seeking_members' ? post?.roles_needed : post?.desired_roles) ?? [],
    [post]
  );
  const isTeamPost = post?.type === 'team_seeking_members';
  const hasCapacity =
    isTeamPost && post?.team_size !== undefined && post?.team_capacity !== undefined;
  const teamOccupancyLabel = hasCapacity ? `${post.team_size}/${post.team_capacity} members` : null;
  const openSpots = hasCapacity ? Math.max(post.team_capacity - post.team_size, 0) : null;

  useEffect(() => {
    setSelectedRoles([]);
  }, [post, isOpen]);

  const handleSubmit = () => {
    if (!post) return;

    if (isTeamPost && roles.length > 0 && selectedRoles.length === 0) {
      setFeedback({
        type: 'error',
        text: 'Select at least one role you can help with before expressing interest.',
      });
      return;
    }

    const result = onExpressInterest(post.id, message, isTeamPost ? selectedRoles : []);
    if (result.success) {
      setFeedback({ type: 'success', text: 'Interest expressed successfully!' });
      setMessage('');
      setSelectedRoles([]);
    } else if (result.error) {
      setFeedback({ type: 'error', text: result.error });
    }
  };

  const handleToggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((value) => value !== role) : [...prev, role]
    );
    setFeedback((prev) => (prev?.type === 'error' ? null : prev));
  };

  const handleClose = () => {
    setMessage('');
    setFeedback(null);
    setSelectedRoles([]);
    onClose();
  };

  if (!post) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="modal-header">
        <h3>{post.title}</h3>
        <button type="button" className="modal-close" onClick={handleClose}>
          ×
        </button>
      </div>
      <div className="modal-body">
        <div className="post-detail-content">
          <div className="post-header">
            <img src={post.owner_avatar} alt={post.owner_name} className="post-avatar" />
            <div className="post-meta">
              <h4>{post.owner_name}</h4>
              <p>{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="post-description">
            <p>{post.description}</p>
          </div>

          <div className="post-details">
            {teamOccupancyLabel ? (
              <div className="post-detail-item">
                <span aria-hidden="true">� Team:</span>
                <span>{teamOccupancyLabel}</span>
              </div>
            ) : null}
            {isTeamPost && openSpots !== null ? (
              <div className="post-detail-item">
                <span aria-hidden="true">🪑 Openings:</span>
                <span>
                  {openSpots === 0
                    ? 'All positions filled'
                    : `${openSpots} spot${openSpots > 1 ? 's' : ''} open`}
                </span>
              </div>
            ) : null}
          </div>

          <div className="tags-container">
            <h4>Tech Stack</h4>
            <div className="tags-list">
              {post.tech_tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="tags-container">
            <h4>{post.type === 'team_seeking_members' ? 'Roles Needed' : 'Desired Roles'}</h4>
            <div className="tags-list">
              {roles.map((role) => (
                <span key={role} className="tag">
                  {role}
                </span>
              ))}
            </div>
          </div>

          {post.current_members ? (
            <div className="team-members">
              <h4>Current Team Members</h4>
              <div className="team-grid">
                {post.current_members.map((member) => (
                  <div key={member.name} className="team-member">
                    <img src={member.avatar} alt={member.name} className="team-member-avatar" />
                    <div className="team-member-info">
                      <h5>{member.name}</h5>
                      <p>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="express-interest-section">
            {isOwner ? (
              <>
                <h4>This is your post</h4>
                <p>
                  You cannot express interest in your own post. Head to your dashboard to review
                  received interests.
                </p>
              </>
            ) : existingInterest ? (
              <>
                <h4>Express Interest</h4>
                <div className="success-message">
                  Interest already expressed! Status:{' '}
                  <strong>{existingInterest.status}</strong>
                  {existingInterest.roles && existingInterest.roles.length > 0 ? (
                    <div className="success-message__meta">
                      Roles shared: {existingInterest.roles.join(', ')}
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <h4>Express Interest</h4>
                {feedback ? (
                  <div
                    className={`success-message ${feedback.type === 'error' ? 'interest-status--declined' : ''}`}
                    role="status"
                  >
                    {feedback.text}
                  </div>
                ) : null}
                {isTeamPost && roles.length > 0 ? (
                  <div className="role-selector">
                    <p className="role-selector__label">Select the role(s) you can support</p>
                    <div className="role-selector__options">
                      {roles.map((role) => {
                        const isSelected = selectedRoles.includes(role);
                        return (
                          <label
                            key={role}
                            className={`role-selector__option ${isSelected ? 'role-selector__option--selected' : ''}`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleRole(role)}
                            />
                            <span>{role}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
                <textarea
                  id="interestMessage"
                  className="form-control"
                  placeholder="Write a message to introduce yourself..."
                  rows={3}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
                <div style={{ marginTop: 16 }}>
                  <button type="button" className="btn btn--primary" onClick={handleSubmit}>
                    Express Interest
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

PostDetailModal.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    owner_name: PropTypes.string,
    owner_avatar: PropTypes.string,
    tech_tags: PropTypes.arrayOf(PropTypes.string),
    roles_needed: PropTypes.arrayOf(PropTypes.string),
    desired_roles: PropTypes.arrayOf(PropTypes.string),
    team_size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    team_capacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    current_members: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      })
    ),
    created_at: PropTypes.string,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onExpressInterest: PropTypes.func.isRequired,
  existingInterest: PropTypes.shape({
    status: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
  isOwner: PropTypes.bool.isRequired,
};

export default PostDetailModal;
