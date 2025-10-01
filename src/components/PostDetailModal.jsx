import { useMemo, useState } from 'react';
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

  const roles = useMemo(
    () => (post?.type === 'team_seeking_members' ? post?.roles_needed : post?.desired_roles) ?? [],
    [post]
  );

  const handleSubmit = () => {
    if (!post) return;

    const result = onExpressInterest(post.id, message);
    if (result.success) {
      setFeedback({ type: 'success', text: 'Interest expressed successfully!' });
      setMessage('');
    } else if (result.error) {
      setFeedback({ type: 'error', text: result.error });
    }
  };

  const handleClose = () => {
    setMessage('');
    setFeedback(null);
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
            <div className="post-detail-item">
              <span aria-hidden="true">📍 Work Preference:</span>
              <span>{post.work_preference}</span>
            </div>
            <div className="post-detail-item">
              <span aria-hidden="true">⏰ Time Commitment:</span>
              <span>{post.time_commitment}</span>
            </div>
            <div className="post-detail-item">
              <span aria-hidden="true">📅 Duration:</span>
              <span>{post.duration}</span>
            </div>
            {post.team_size ? (
              <div className="post-detail-item">
                <span aria-hidden="true">👥 Team Size:</span>
                <span>{post.team_size} members</span>
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

          <div className="match-score">
            <div className="match-percentage">{Math.round(post.match_score * 100)}% match</div>
            <div className="match-explanation">{post.match_explanation}</div>
          </div>

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
    work_preference: PropTypes.string,
    time_commitment: PropTypes.string,
    duration: PropTypes.string,
    team_size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    current_members: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      })
    ),
    match_score: PropTypes.number,
    match_explanation: PropTypes.string,
    created_at: PropTypes.string,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onExpressInterest: PropTypes.func.isRequired,
  existingInterest: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }),
  isOwner: PropTypes.bool.isRequired,
};

export default PostDetailModal;
