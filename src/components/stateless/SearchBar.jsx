import PropTypes from "prop-types";

export default function SearchBar({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
SearchBar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
};
