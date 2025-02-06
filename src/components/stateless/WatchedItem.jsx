import PropTypes from "prop-types";

function WatchedItem({ movie, handleRemoveWatchedMovie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => handleRemoveWatchedMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

WatchedItem.propTypes = {
  movie: PropTypes.object,
  handleRemoveWatchedMovie: PropTypes.func,
};

export default WatchedItem;
