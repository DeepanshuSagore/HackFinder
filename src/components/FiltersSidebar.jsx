import PropTypes from 'prop-types';

const POST_TYPE_OPTIONS = [
  { value: '', label: 'All Posts' },
  { value: 'team_seeking_members', label: 'Teams Seeking Members' },
  { value: 'individual_seeking_team', label: 'Individuals Seeking Teams' },
];

const SKILL_OPTIONS = [
  { value: '', label: 'All Skills' },
  { value: 'React', label: 'React' },
  { value: 'Python', label: 'Python' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'TensorFlow', label: 'TensorFlow' },
  { value: 'Figma', label: 'Figma' },
  { value: 'Solidity', label: 'Solidity' },
];

const ROLE_OPTIONS = [
  { value: '', label: 'All Roles' },
  { value: 'Frontend Developer', label: 'Frontend Developer' },
  { value: 'Backend Developer', label: 'Backend Developer' },
  { value: 'UI/UX Designer', label: 'UI/UX Designer' },
  { value: 'ML Engineer', label: 'ML Engineer' },
  { value: 'Blockchain Developer', label: 'Blockchain Developer' },
];

const WORK_OPTIONS = [
  { value: '', label: 'All Preferences' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
];

function FiltersSidebar({ filters, onFilterChange, onClearFilters }) {
  const handleChange = (name) => (event) => {
    onFilterChange(name, event.target.value);
  };

  return (
    <aside className="filters-sidebar">
      <div className="filter-section">
        <h3>Filters</h3>

        <div className="filter-group">
          <label className="form-label" htmlFor="typeFilter">
            Post Type
          </label>
          <select
            id="typeFilter"
            className="form-control"
            value={filters.type}
            onChange={handleChange('type')}
          >
            {POST_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="form-label" htmlFor="skillsFilter">
            Skills
          </label>
          <select
            id="skillsFilter"
            className="form-control"
            value={filters.skills}
            onChange={handleChange('skills')}
          >
            {SKILL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="form-label" htmlFor="rolesFilter">
            Roles
          </label>
          <select
            id="rolesFilter"
            className="form-control"
            value={filters.roles}
            onChange={handleChange('roles')}
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="form-label" htmlFor="workFilter">
            Work Preference
          </label>
          <select
            id="workFilter"
            className="form-control"
            value={filters.work}
            onChange={handleChange('work')}
          >
            {WORK_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="button" className="btn btn--secondary btn--full-width" onClick={onClearFilters}>
          Clear Filters
        </button>
      </div>
    </aside>
  );
}

FiltersSidebar.propTypes = {
  filters: PropTypes.shape({
    type: PropTypes.string,
    skills: PropTypes.string,
    roles: PropTypes.string,
    work: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default FiltersSidebar;
