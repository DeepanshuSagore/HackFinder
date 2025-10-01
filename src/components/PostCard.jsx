import PropTypes from 'prop-types';

function PostCard({ post, onSelect }) {
  const isTeam = post.type === 'team_seeking_members';
  const typeClass = isTeam ? 'team' : 'individual';
  const typeLabel = isTeam ? 'Team' : 'Individual';
  const roles = isTeam ? post.roles_needed : post.desired_roles;

  return (
    <div className="post-card" onClick={() => onSelect(post)} role="presentation">
      <div className="post-header">
        <div className="post-header__primary">
          <img src={post.owner_avatar} alt={post.owner_name} className="post-avatar" />
          <div className="post-meta">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-author">by {post.owner_name}</p>
          </div>
        </div>
        <span className={`post-type-badge post-type-badge--${typeClass}`}>{typeLabel}</span>
      </div>

      <p className="post-description">{post.description}</p>

      <div className="post-details">
        <div className="post-detail-item">
          <span aria-hidden="true">📍</span>
          <span>{post.work_preference}</span>
        </div>
        <div className="post-detail-item">
          <span aria-hidden="true">⏰</span>
          <span>{post.time_commitment}</span>
        </div>
        <div className="post-detail-item">
          <span aria-hidden="true">👥</span>
          <span>{roles?.join(', ')}</span>
        </div>
      </div>

      <div className="tags-container">
        <div className="tags-list">
          {post.tech_tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="match-score">
        <div className="match-percentage">{Math.round(post.match_score * 100)}% match</div>
        <div className="match-explanation">{post.match_explanation}</div>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    owner_name: PropTypes.string.isRequired,
    owner_avatar: PropTypes.string.isRequired,
    tech_tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    roles_needed: PropTypes.arrayOf(PropTypes.string),
    desired_roles: PropTypes.arrayOf(PropTypes.string),
    work_preference: PropTypes.string.isRequired,
    time_commitment: PropTypes.string.isRequired,
    match_score: PropTypes.number.isRequired,
    match_explanation: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PostCard;
