import PropTypes from 'prop-types';

function PostCard({ post, onSelect }) {
  const isTeam = post.type === 'team_seeking_members';
  const typeClass = isTeam ? 'team' : 'individual';
  const typeLabel = isTeam ? 'Team' : 'Individual';
  const roles = isTeam ? post.roles_needed : post.desired_roles;
  const hasCapacity =
    isTeam && post.team_size !== undefined && post.team_capacity !== undefined;
  const teamOccupancy = hasCapacity ? `${post.team_size}/${post.team_capacity}` : null;
  const roleSummary = roles?.length ? roles.join(', ') : 'Roles coming soon';

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
        {teamOccupancy ? (
          <div className="post-detail-item">
            <span aria-hidden="true">👥</span>
            <span>{teamOccupancy} members</span>
          </div>
        ) : null}
        <div className="post-detail-item">
          <span aria-hidden="true">🛠️</span>
          <span>{roleSummary}</span>
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
    team_size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    team_capacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PostCard;
