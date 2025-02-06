import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import StarRating from "./StarRating";
import Message from "../stateless/Message";

function MovieDetails({
  movieID,
  handleCloseMovieClick,
  handleAddWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    Title: title,
    Poster: poster,
    Year: year,
    imdbRating,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    Director: director,
    Actors: actors,
    Plot: plot,
  } = movie;
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const movieWatched = watched.some((movie) => movie.imdbID === movieID);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === movieID
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: movieID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    handleAddWatchedMovie(newWatchedMovie);
    handleCloseMovieClick();
  }

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}`
        );

        if (!res.ok) {
          throw new Error("Error getting response from getMovieDetails");
        }
        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(`Movie with ID "${movieID}" not found`);
        }
        setMovie(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
  }, [movieID, apiKey]);

  return (
    <div className="details">
      {isLoading && <Message message={"Loading..."} type={"loader"} />}
      {!isLoading && errorMessage && (
        <Message message={errorMessage} type={"error"} />
      )}
      {!isLoading && !errorMessage.length && (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovieClick}>
              &larr;
            </button>
            <img src={poster} alt={`Poster for ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!movieWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating} stars.</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

MovieDetails.propTypes = {
  movieID: PropTypes.string,
  handleCloseMovieClick: PropTypes.func,
  handleAddWatchedMovie: PropTypes.func,
  watched: PropTypes.array,
};

export default MovieDetails;
