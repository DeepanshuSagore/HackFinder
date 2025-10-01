import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const TIMELINE_FILTERS = [
  { id: 'all', label: 'All activity' },
  { id: 'posts', label: 'My posts' },
  { id: 'incoming', label: 'Incoming' },
  { id: 'outbound', label: 'My interests' },
];

const TIMELINE_SECTIONS = [
  { id: 'this-week', label: 'This Week' },
  { id: 'last-week', label: 'Last Week' },
  { id: 'earlier', label: 'Earlier' },
];

const STATUS_VARIANTS = {
  pending: 'status--warning',
  accepted: 'status--success',
  declined: 'status--error',
};

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
  const [timelineFilter, setTimelineFilter] = useState('all');

  const pendingReceived = useMemo(
    () => receivedInterests.filter((interest) => interest.status === 'pending').length,
    [receivedInterests]
  );

  const pendingMyInterests = useMemo(
    () => myInterests.filter((interest) => interest.status === 'pending').length,
    [myInterests]
  );

  const totalPosts = myPosts.length;

  const summarizeText = (text, maxLength = 120) => {
    if (!text) {
      return '';
    }

    return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}…` : text;
  };

  const formatStatusLabel = (status) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const toDate = (value) => {
    if (!value) {
      return new Date();
    }
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  };

  const formatDateLabel = (date) =>
    new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
    }).format(date);

  const formatRelativeDate = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.round(diffDays / 7);
      return `${weeks} wk${weeks > 1 ? 's' : ''} ago`;
    }

    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    }).format(date);
  };

  const getTimelineBucket = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

    if (diffDays <= 7) return 'this-week';
    if (diffDays <= 14) return 'last-week';
    return 'earlier';
  };

  const eventTypeLabels = {
    post: 'My Post',
    incoming: 'Incoming Interest',
    outbound: 'My Interest',
  };

  const summaryStats = useMemo(
    () => [
      {
        id: 'posts',
        label: 'Active Posts',
        value: totalPosts,
        caption: totalPosts === 1 ? 'Live listing' : 'Live listings',
      },
      {
        id: 'incoming',
        label: 'Pending responses',
        value: pendingReceived,
        caption: 'Needs your review',
      },
      {
        id: 'outbound',
        label: 'My pending interests',
        value: pendingMyInterests,
        caption: 'Awaiting replies',
      },
      {
        id: 'suggested',
        label: 'New suggestions',
        value: suggestedPosts.length,
        caption: 'Curated for you',
      },
    ],
    [totalPosts, pendingReceived, pendingMyInterests, suggestedPosts.length]
  );

  const timelineEvents = useMemo(() => {
    const events = [];

    myPosts.forEach((post) => {
      const createdAt = toDate(post.created_at);
      events.push({
        id: `post-${post.id}`,
        type: 'post',
        category: 'posts',
        createdAt,
        title: post.title,
        description: summarizeText(post.description, 160) || 'Description coming soon.',
        meta: [
          post.work_preference ? `Work: ${post.work_preference}` : null,
          post.time_commitment ? `Time: ${post.time_commitment}` : null,
        ].filter(Boolean),
        tags: (post.tech_tags || []).slice(0, 4),
        postId: post.id,
        status: 'active',
      });
    });

    receivedInterests.forEach((interest) => {
      const createdAt = toDate(interest.created_at);
      const interestedUser = usersById[interest.user_id];
      const post = myPosts.find((item) => item.id === interest.post_id) ?? null;

      events.push({
        id: `incoming-${interest.id}`,
        type: 'incoming',
        category: 'incoming',
        createdAt,
        title: interestedUser ? interestedUser.name : 'Unknown User',
        subtitle: post ? `Interested in ${post.title}` : 'Interested in one of your posts',
        description: summarizeText(interest.message, 180) || 'No additional message provided.',
        status: interest.status,
        interestId: interest.id,
        postId: post?.id,
      });
    });

    myInterests.forEach((interest) => {
      const createdAt = toDate(interest.created_at);
      const relatedPost = interest.post ?? null;

      events.push({
        id: `outbound-${interest.id}`,
        type: 'outbound',
        category: 'outbound',
        createdAt,
        title: relatedPost ? relatedPost.title : 'Unknown Post',
        subtitle: relatedPost?.owner_name ? `Owner: ${relatedPost.owner_name}` : null,
        description: summarizeText(interest.message, 180) || 'No additional message provided.',
        status: interest.status,
        postId: relatedPost?.id ?? interest.post_id,
        tags: relatedPost?.tech_tags ? relatedPost.tech_tags.slice(0, 4) : [],
      });
    });

    return events
      .filter((event) => event.createdAt instanceof Date && !Number.isNaN(event.createdAt.getTime()))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [myPosts, myInterests, receivedInterests, usersById]);

  const filteredEvents = useMemo(() => {
    if (timelineFilter === 'all') {
      return timelineEvents;
    }
    return timelineEvents.filter((event) => event.category === timelineFilter);
  }, [timelineEvents, timelineFilter]);

  const groupedEvents = useMemo(() => {
    const groups = {
      'this-week': [],
      'last-week': [],
      earlier: [],
    };

    filteredEvents.forEach((event) => {
      const bucket = getTimelineBucket(event.createdAt);
      groups[bucket].push(event);
    });

    return groups;
  }, [filteredEvents]);

  const filterCounts = useMemo(
    () => ({
      all: timelineEvents.length,
      posts: myPosts.length,
      incoming: receivedInterests.length,
      outbound: myInterests.length,
    }),
    [timelineEvents.length, myPosts.length, receivedInterests.length, myInterests.length]
  );

  const latestActivityDate = filteredEvents[0]?.createdAt ?? null;
  const latestActivityLabel = latestActivityDate ? formatRelativeDate(latestActivityDate) : 'No activity yet';
  const hasEvents = filteredEvents.length > 0;

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Timeline overview</h2>
        <p>Scan recent posts and interest activity in chronological order</p>
      </div>

      <div className="dashboard-layout">
        <aside className="dashboard-sidebar" aria-label="Timeline filters and stats">
          <div className="dashboard-sidebar__section">
            <h3 className="dashboard-sidebar__title">Quick stats</h3>
            <div className="dashboard-sidebar__stats">
              {summaryStats.map((stat) => (
                <div key={stat.id} className="sidebar-stat">
                  <div>
                    <p className="sidebar-stat__label">{stat.label}</p>
                    <span className="sidebar-stat__caption">{stat.caption}</span>
                  </div>
                  <span className="sidebar-stat__value">{stat.value}</span>
                </div>
              ))}
            </div>
            <p className="dashboard-sidebar__meta">Last update: {latestActivityLabel}</p>
          </div>

          <div className="dashboard-sidebar__section">
            <h3 className="dashboard-sidebar__title">Timeline filters</h3>
            <div className="dashboard-sidebar__filters" role="group" aria-label="Timeline filters">
              {TIMELINE_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={`dashboard-sidebar__filter ${
                    timelineFilter === filter.id ? 'dashboard-sidebar__filter--active' : ''
                  }`}
                  onClick={() => setTimelineFilter(filter.id)}
                  aria-pressed={timelineFilter === filter.id}
                >
                  <span>{filter.label}</span>
                  <span className="dashboard-sidebar__filter-count">{filterCounts[filter.id] ?? 0}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="dashboard-sidebar__section">
            <button type="button" className="btn btn--primary btn--full-width" onClick={onCreatePost}>
              + Add New Post
            </button>
          </div>
        </aside>

        <section className="dashboard-timeline" aria-live="polite">
          {TIMELINE_SECTIONS.map((section) => {
            const sectionEvents = groupedEvents[section.id];
            if (!sectionEvents || sectionEvents.length === 0) {
              return null;
            }

            return (
              <div key={section.id} className="timeline-section">
                <div className="timeline-section__header">
                  <h3>{section.label}</h3>
                  <span>
                    {sectionEvents.length} update{sectionEvents.length === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="timeline-section__list">
                  {sectionEvents.map((event) => {
                    const statusClass = STATUS_VARIANTS[event.status] || 'status--info';
                    const showStatus = Boolean(event.status && STATUS_VARIANTS[event.status]);
                    const showActions =
                      (event.type === 'incoming' && event.status === 'pending') || Boolean(event.postId);

                    return (
                      <article key={event.id} className={`timeline-item timeline-item--${event.type}`}>
                        <div className="timeline-item__badge-row">
                          <span className="timeline-item__badge">{eventTypeLabels[event.type]}</span>
                          <span className="timeline-item__date">{formatDateLabel(event.createdAt)}</span>
                        </div>
                        <h4 className="timeline-item__title">{event.title}</h4>
                        {event.subtitle ? <p className="timeline-item__subtitle">{event.subtitle}</p> : null}
                        {event.description ? (
                          <p className="timeline-item__description">{event.description}</p>
                        ) : null}
                        {event.meta && event.meta.length > 0 ? (
                          <ul className="timeline-item__meta">
                            {event.meta.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : null}
                        {event.tags && event.tags.length > 0 ? (
                          <div className="tags-list timeline-item__tags">
                            {event.tags.map((tag) => (
                              <span key={tag} className="tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        {(showStatus || showActions) && (
                          <div className="timeline-item__footer">
                            {showStatus ? (
                              <span className={`status ${statusClass}`}>{formatStatusLabel(event.status)}</span>
                            ) : (
                              <span />
                            )}

                            {showActions ? (
                              <div className="timeline-item__actions">
                                {event.type === 'incoming' && event.status === 'pending' ? (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn--primary btn--sm"
                                      onClick={() => onRespondToInterest(event.interestId, 'accepted')}
                                    >
                                      Accept
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn--secondary btn--sm"
                                      onClick={() => onRespondToInterest(event.interestId, 'declined')}
                                    >
                                      Decline
                                    </button>
                                  </>
                                ) : null}
                                {event.postId ? (
                                  <button
                                    type="button"
                                    className="btn btn--secondary btn--sm"
                                    onClick={() => onViewPost(event.postId)}
                                  >
                                    View Post
                                  </button>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {!hasEvents ? (
            <div className="timeline-empty empty-state">
              <h4>No activity yet</h4>
              <p>Create a post or express interest to populate your timeline.</p>
            </div>
          ) : null}
        </section>
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
