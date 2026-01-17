import PropTypes from "prop-types";
import { useCallback, useRef } from "react";
import { useKeyPress } from "../../hooks";

export default function SearchBar({ query, setQuery }) {
  const inputEl = useRef(null);

  const handleEnterFocus = useCallback(() => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  }, [setQuery]);

  useKeyPress("Enter", handleEnterFocus);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
SearchBar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
};
