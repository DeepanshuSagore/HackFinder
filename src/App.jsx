import { useEffect, useMemo, useState } from 'react';
import { FunnelSimple } from '@phosphor-icons/react';
import Header from './components/Header.jsx';
import LandingPage from './components/LandingPage.jsx';
import FiltersSidebar from './components/FiltersSidebar.jsx';
import PostsFeed from './components/PostsFeed.jsx';
import Dashboard from './components/Dashboard.jsx';
import PostDetailModal from './components/PostDetailModal.jsx';
import CreatePostModal from './components/CreatePostModal.jsx';
import ProfileModal from './components/ProfileModal.jsx';
import appData from './data/appData.js';

const EMPTY_FILTERS = {
  type: '',
  skills: '',
  roles: '',
  work: '',
};

function App() {
  const { currentUser, users } = appData;
  const [view, setView] = useState('home');
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [posts, setPosts] = useState(appData.posts);
  const [interests, setInterests] = useState(appData.interests);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isFiltersOpen, setFiltersOpen] = useState(false);

  const currentUserProfile = useMemo(() => {
    const profile = users.find((user) => user.id === currentUser.id);
    if (!profile) {
      return {
        ...currentUser,
        bio: '',
        skills: [],
        roles: [],
        experience: '',
        location: '',
        timezone: '',
        github: '',
        linkedin: '',
        verified: false,
      };
    }
    return profile;
  }, [users, currentUser]);

  const usersById = useMemo(() => {
    const map = {};
    users.forEach((user) => {
      map[user.id] = user;
    });
    map[currentUser.id] = currentUserProfile;
    return map;
  }, [users, currentUser.id, currentUserProfile]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (filters.type && post.type !== filters.type) return false;
      if (filters.skills && !post.tech_tags.includes(filters.skills)) return false;
      if (filters.roles) {
        const roles = post.roles_needed || post.desired_roles || [];
        if (!roles.includes(filters.roles)) return false;
      }
      if (filters.work && post.work_preference !== filters.work) return false;
      return true;
    });
  }, [posts, filters]);

  const selectedPost = useMemo(
    () => posts.find((post) => post.id === selectedPostId) ?? null,
    [posts, selectedPostId]
  );

  const existingInterest = useMemo(() => {
    if (!selectedPost) return null;
    return interests.find(
      (interest) => interest.user_id === currentUser.id && interest.post_id === selectedPost.id
    ) ?? null;
  }, [selectedPost, interests, currentUser.id]);

  const isOwner = selectedPost?.owner_id === currentUser.id;

  const myPosts = useMemo(
    () => posts.filter((post) => post.owner_id === currentUser.id),
    [posts, currentUser.id]
  );

  const myPostIds = useMemo(() => new Set(myPosts.map((post) => post.id)), [myPosts]);

  const receivedInterests = useMemo(
    () => interests.filter((interest) => myPostIds.has(interest.post_id)),
    [interests, myPostIds]
  );

  const myInterests = useMemo(
    () =>
      interests
        .filter((interest) => interest.user_id === currentUser.id)
        .map((interest) => ({
          ...interest,
          post: posts.find((post) => post.id === interest.post_id) ?? null,
        })),
    [interests, currentUser.id, posts]
  );

  const suggestedPosts = useMemo(
    () => posts.filter((post) => post.owner_id !== currentUser.id).slice(0, 3),
    [posts, currentUser.id]
  );

  useEffect(() => {
    const anyModalOpen = isPostModalOpen || isCreateModalOpen || isProfileModalOpen;
    document.body.style.overflow = anyModalOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPostModalOpen, isCreateModalOpen, isProfileModalOpen]);

  useEffect(() => {
    if (view !== 'browse') {
      setFiltersOpen(false);
    }
  }, [view]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setFiltersOpen(false);
  };

  const openPostDetailById = (postId) => {
    const post = posts.find((item) => item.id === postId);
    if (!post) return;
    setSelectedPostId(post.id);
    setPostModalOpen(true);
  };

  const handleExpressInterest = (postId, message) => {
    if (!message.trim()) {
      return { success: false, error: 'Please write a message before expressing interest.' };
    }

    const alreadyExpressed = interests.some(
      (interest) => interest.user_id === currentUser.id && interest.post_id === postId
    );
    if (alreadyExpressed) {
      return { success: false, error: 'You have already expressed interest in this post.' };
    }

    const newInterest = {
      id: (interests.length + 1 + Date.now()).toString(),
      user_id: currentUser.id,
      post_id: postId,
      message: message.trim(),
      status: 'pending',
      created_at: new Date().toISOString().split('T')[0],
    };

    setInterests((prev) => [...prev, newInterest]);
    return { success: true };
  };

  const handleRespondToInterest = (interestId, status) => {
    setInterests((prev) =>
      prev.map((interest) => (interest.id === interestId ? { ...interest, status } : interest))
    );
  };

  const handleCreatePost = (formData) => {
    const techTags = formData.techTags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const rolesInput =
      formData.postType === 'team_seeking_members' ? formData.rolesNeeded : formData.desiredRoles;

    const roles = rolesInput
      .split(',')
      .map((role) => role.trim())
      .filter(Boolean);

    const newPost = {
      id: (posts.length + 1 + Date.now()).toString(),
      type: formData.postType,
      title: formData.title,
      description: formData.description,
      owner_id: currentUser.id,
      owner_name: currentUser.name,
      owner_avatar: currentUser.avatar,
      tech_tags: techTags,
      work_preference: formData.workPreference,
      time_commitment: formData.timeCommitment || 'Flexible',
      duration: '3 months',
      created_at: new Date().toISOString().split('T')[0],
      match_score: 0.8,
      match_explanation: 'New post - perfect for exploring opportunities',
      ...(formData.postType === 'team_seeking_members'
        ? { roles_needed: roles, team_size: 1 + roles.length }
        : { desired_roles: roles, availability: 'Open to discussions' }),
    };

    setPosts((prev) => [newPost, ...prev]);
    setCreateModalOpen(false);
    setView('browse');
    setSelectedPostId(newPost.id);
    setPostModalOpen(true);
  };

  const handleGetStarted = () => {
    setView('dashboard');
    setCreateModalOpen(true);
  };

  const handleBrowsePosts = () => {
    setView('browse');
  };

  return (
    <div>
      <Header
        currentView={view}
        onViewChange={setView}
        onCreatePost={() => setCreateModalOpen(true)}
        onShowProfile={() => setProfileModalOpen(true)}
        currentUser={currentUser}
      />

      <main className={`main-content ${view === 'home' ? 'main-content--landing' : ''}`}>
        <section id="landingView" className={`view ${view === 'home' ? 'active' : ''}`}>
          {view === 'home' ? (
            <LandingPage
              onGetStarted={handleGetStarted}
              onBrowsePosts={handleBrowsePosts}
            />
          ) : null}
        </section>

        <section id="browseView" className={`view ${view === 'browse' ? 'active' : ''}`}>
          <div className="container">
            <div className="browse-mobile-actions">
              <button
                type="button"
                className="btn btn--secondary btn--full-width btn--with-icon browse-mobile-actions__button"
                onClick={() => setFiltersOpen((prev) => !prev)}
                aria-expanded={isFiltersOpen}
                aria-controls="browseFilters"
              >
                <FunnelSimple size={18} weight="bold" aria-hidden="true" />
                <span>{isFiltersOpen ? 'Hide Filters' : 'Show Filters'}</span>
              </button>
            </div>
            <div className="browse-layout">
              <FiltersSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isMobileOpen={isFiltersOpen}
                onClose={() => setFiltersOpen(false)}
                onApplyFilters={() => setFiltersOpen(false)}
              />
              <PostsFeed
                posts={filteredPosts}
                onSelectPost={(post) => openPostDetailById(post.id)}
              />
            </div>
          </div>
          {isFiltersOpen ? (
            <button
              type="button"
              className="filters-sidebar__backdrop"
              onClick={() => setFiltersOpen(false)}
              aria-label="Close filters overlay"
            />
          ) : null}
        </section>

        <section id="dashboardView" className={`view ${view === 'dashboard' ? 'active' : ''}`}>
          {view === 'dashboard' ? (
            <Dashboard
              myPosts={myPosts}
              receivedInterests={receivedInterests}
              myInterests={myInterests}
              suggestedPosts={suggestedPosts}
              onRespondToInterest={handleRespondToInterest}
              onViewPost={openPostDetailById}
              onCreatePost={() => setCreateModalOpen(true)}
              usersById={usersById}
            />
          ) : null}
        </section>
      </main>

      <PostDetailModal
        post={selectedPost}
        isOpen={isPostModalOpen}
        onClose={() => setPostModalOpen(false)}
        onExpressInterest={handleExpressInterest}
        existingInterest={existingInterest}
        isOwner={isOwner}
      />

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreatePost={handleCreatePost}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={currentUserProfile}
      />
    </div>
  );
}

export default App;
