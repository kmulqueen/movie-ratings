import PropTypes from "prop-types";
import MovieItem from "./MovieItem";

function MovieList({ movies, handleSelectMovieClick }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem
          movie={movie}
          key={movie.imdbID}
          handleSelectMovieClick={handleSelectMovieClick}
        />
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array,
  handleSelectMovieClick: PropTypes.func,
};

export default MovieList;
