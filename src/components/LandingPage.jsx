import PropTypes from 'prop-types';

function LandingPage({ onGetStarted, onBrowsePosts }) {
  return (
    <section className="landing">
      <div className="landing__hero">
        <div className="container landing__hero-content">
          <div className="landing__copy">
            <div className="landing__badge">Built for Hackers &amp; Makers</div>
            <h1>Ship faster by finding the perfect hackathon team.</h1>
            <p>
              HackFinder matches ambitious builders with teammates who share their skills, vision,
              and availability. Discover curated opportunities, manage interests, and turn ideas
              into demos in record time.
            </p>
            <div className="landing__cta-group">
              <button type="button" className="btn btn--primary btn--lg" onClick={onGetStarted}>
                Get Started
              </button>
              <button type="button" className="btn btn--secondary btn--lg" onClick={onBrowsePosts}>
                Explore Posts
              </button>
            </div>
            <div className="landing__meta">
              <div>
                <strong>250+</strong>
                <span>Projects launched via HackFinder</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Average teammate rating</span>
              </div>
              <div>
                <strong>48 hrs</strong>
                <span>Average time to assemble a team</span>
              </div>
            </div>
          </div>
          <div className="landing__preview-card">
            <div className="landing__preview-header">
              <span className="status status--success">Live feed</span>
              <span>Matching teams &amp; builders in real time</span>
            </div>
            <ul className="landing__preview-list">
              <li>
                <div>
                  <strong>Climate Data Viz Team</strong>
                  <p>Looking for a React + D3 wizard to visualize satellite data.</p>
                </div>
                <span className="landing__preview-tag">React</span>
              </li>
              <li>
                <div>
                  <strong>Healthcare AI Squad</strong>
                  <p>Need an ML engineer comfortable with TensorFlow &amp; on-call iterations.</p>
                </div>
                <span className="landing__preview-tag">TensorFlow</span>
              </li>
              <li>
                <div>
                  <strong>Web3 Gamified Onboarding</strong>
                  <p>Seeking Solidity devs to build smart-contract mini games for onboarding.</p>
                </div>
                <span className="landing__preview-tag">Solidity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="landing__section landing__features">
        <div className="container">
          <h2>Why teams launch on HackFinder</h2>
          <div className="landing__features-grid">
            <div className="landing__feature-card">
              <div className="landing__feature-icon" aria-hidden="true">⚡️</div>
              <h3>Smart matchmaking</h3>
              <p>
                Filter by skills, timezone, and commitment to surface the teammates most likely to
                ship with you.
              </p>
            </div>
            <div className="landing__feature-card">
              <div className="landing__feature-icon" aria-hidden="true">🤝</div>
              <h3>Human signals</h3>
              <p>
                Profiles highlight experience, roles, and interests so you can gauge fit before you
                ever hop on a call.
              </p>
            </div>
            <div className="landing__feature-card">
              <div className="landing__feature-icon" aria-hidden="true">📅</div>
              <h3>Keep momentum</h3>
              <p>
                Built-in dashboards help you track interests, respond quickly, and never miss a
                potential collaborator.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="landing__section landing__testimonials">
        <div className="container">
          <h2>Loved by hackathon champions</h2>
          <div className="landing__testimonial-grid">
            <blockquote>
              “We assembled a full-stack AI team in under 24 hours. HackFinder’s filters meant every
              intro was a legit match.”
              <cite>— Priya, Winner @ ETHGlobal</cite>
            </blockquote>
            <blockquote>
              “The dashboard made it effortless to juggle interests and conversations. We shipped on
              time and took home first place.”
              <cite>— Daniel, Lead @ LA Hacks</cite>
            </blockquote>
            <blockquote>
              “Being able to broadcast specific roles and commitment upfront cut the churn to nearly
              zero. Huge win.”
              <cite>— Mei, Organizer @ HackMIT</cite>
            </blockquote>
          </div>
        </div>
      </div>

      <div className="landing__cta">
        <div className="container landing__cta-content">
          <div>
            <h2>Ready to launch your next winning project?</h2>
            <p>Join thousands of hackers forming dream teams on HackFinder.</p>
          </div>
          <button type="button" className="btn btn--primary btn--lg" onClick={onGetStarted}>
            Join the community
          </button>
        </div>
      </div>
    </section>
  );
}

LandingPage.propTypes = {
  onGetStarted: PropTypes.func.isRequired,
  onBrowsePosts: PropTypes.func.isRequired,
};

export default LandingPage;
