import PropTypes from "prop-types";

function MovieItem({ movie, handleSelectMovieClick }) {
  return (
    <li onClick={() => handleSelectMovieClick(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.object,
  handleSelectMovieClick: PropTypes.func,
};

export default MovieItem;
