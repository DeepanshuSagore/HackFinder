import PropTypes from 'prop-types';
import PostCard from './PostCard.jsx';

function PostsFeed({ posts, onSelectPost }) {
  return (
    <div className="posts-feed">
      <div className="feed-header">
        <h2>Available Opportunities</h2>
        <p className="feed-subtitle">
          Connect with teams and individuals looking for their perfect match
        </p>
      </div>
      <div className="posts-grid">
        {posts.length === 0 ? (
          <div className="empty-state">
            <h4>No posts found</h4>
            <p>Try adjusting your filters or create a new post</p>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} onSelect={onSelectPost} />)
        )}
      </div>
    </div>
  );
}

PostsFeed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectPost: PropTypes.func.isRequired,
};

export default PostsFeed;
