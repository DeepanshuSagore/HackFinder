import PropTypes from 'prop-types';

function Dashboard({
  myPosts,
  receivedInterests,
  myInterests,
  suggestedPosts,
  onRespondToInterest,
  onViewPost,
  onCreatePost,
  usersById,
}) {
  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Your Dashboard</h2>
        <p>Manage your posts, interests, and find new opportunities</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card__header">
            <h3>My Posts</h3>
            <button type="button" className="btn btn--primary btn--sm" onClick={onCreatePost}>
              + New Post
            </button>
          </div>
          <div className="card__body">
            {myPosts.length === 0 ? (
              <div className="empty-state">
                <h4>No posts yet</h4>
                <p>Create your first post to get started</p>
              </div>
            ) : (
              myPosts.map((post) => (
                <div key={post.id} className="dashboard-item">
                  <h4>{post.title}</h4>
                  <p>{`${post.description.slice(0, 100)}...`}</p>
                  <div className="tags-list">
                    {post.tech_tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="post-actions" style={{ marginTop: '12px' }}>
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      onClick={() => onViewPost(post.id)}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card__header">
            <h3>Received Interests</h3>
          </div>
          <div className="card__body">
            {receivedInterests.length === 0 ? (
              <div className="empty-state">
                <h4>No interests received</h4>
                <p>When someone expresses interest in your posts, they'll appear here</p>
              </div>
            ) : (
              receivedInterests.map((interest) => {
                const interestedUser = usersById[interest.user_id];
                const post = myPosts.find((p) => p.id === interest.post_id);

                return (
                  <div key={interest.id} className="dashboard-item">
                    <div className="interest-item">
                      <div>
                        <h4>{interestedUser ? interestedUser.name : 'Unknown User'}</h4>
                        <p>Interested in: {post ? post.title : 'Unknown Post'}</p>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                          “{interest.message}”
                        </p>
                        <div className={`interest-status interest-status--${interest.status}`}>
                          Status: {interest.status}
                        </div>
                      </div>
                      {interest.status === 'pending' ? (
                        <div className="interest-actions">
                          <button
                            type="button"
                            className="btn btn--primary btn--sm"
                            onClick={() => onRespondToInterest(interest.id, 'accepted')}
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            className="btn btn--secondary btn--sm"
                            onClick={() => onRespondToInterest(interest.id, 'declined')}
                          >
                            Decline
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card__header">
            <h3>My Interests</h3>
          </div>
          <div className="card__body">
            {myInterests.length === 0 ? (
              <div className="empty-state">
                <h4>No interests expressed</h4>
                <p>When you express interest in posts, they'll appear here</p>
              </div>
            ) : (
              myInterests.map((interest) => (
                <div key={interest.id} className="dashboard-item">
                  <h4>{interest.post?.title ?? 'Unknown Post'}</h4>
                  <p>“{interest.message}”</p>
                  <div className={`interest-status interest-status--${interest.status}`}>
                    Status: {interest.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card__header">
            <h3>Suggested for You</h3>
          </div>
          <div className="card__body">
            {suggestedPosts.length === 0 ? (
              <div className="empty-state">
                <h4>No suggestions</h4>
                <p>Check back later for personalized recommendations</p>
              </div>
            ) : (
              suggestedPosts.map((post) => (
                <div key={post.id} className="dashboard-item">
                  <h4>{post.title}</h4>
                  <p>{`${post.description.slice(0, 80)}...`}</p>
                  <div className="match-score" style={{ margin: '12px 0' }}>
                    <div className="match-percentage">{Math.round(post.match_score * 100)}%</div>
                    <div className="match-explanation">{post.match_explanation}</div>
                  </div>
                  <div className="post-actions">
                    <button
                      type="button"
                      className="btn btn--primary btn--sm"
                      onClick={() => onViewPost(post.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  myPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  receivedInterests: PropTypes.arrayOf(PropTypes.object).isRequired,
  myInterests: PropTypes.arrayOf(PropTypes.object).isRequired,
  suggestedPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRespondToInterest: PropTypes.func.isRequired,
  onViewPost: PropTypes.func.isRequired,
  onCreatePost: PropTypes.func.isRequired,
  usersById: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Dashboard;
