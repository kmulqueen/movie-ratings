import PropTypes from "prop-types";
import WatchedItem from "./WatchedItem";

function WatchedList({ watched, handleRemoveWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedItem
          movie={movie}
          key={movie.imdbID}
          handleRemoveWatchedMovie={handleRemoveWatchedMovie}
        />
      ))}
    </ul>
  );
}

WatchedList.propTypes = {
  watched: PropTypes.array,
  handleRemoveWatchedMovie: PropTypes.func,
};

export default WatchedList;
