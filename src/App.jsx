import { useState, useEffect } from "react";
import NavBar from "./components/structural/NavBar";
import Main from "./components/structural/Main";
import SearchBar from "./components/stateless/SearchBar";
import ResultsCount from "./components/stateless/ResultsCount";
import ListBox from "./components/stateful/ListBox";
import MovieList from "./components/stateless/MovieList";
import WatchedSummary from "./components/stateless/WatchedSummary";
import WatchedList from "./components/stateless/WatchedList";
import Message from "./components/stateless/Message";
import MovieDetails from "./components/stateful/MovieDetails";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("Interstellar");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  function handleSelectMovieClick(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovieClick() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((prevState) => [...prevState, movie]);
  }

  function handleRemoveWatchedMovie(movieID) {
    setWatched((prevState) =>
      prevState.filter((movie) => movie.imdbID !== movieID)
    );
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Error getting response from fetchMovies");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error(`Movie "${query}" not found`);
          }

          setMovies(data.Search);
          setErrorMessage("");
        } catch (error) {
          if (error.name !== "AbortError") {
            setErrorMessage(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      fetchMovies();

      // Cleanup func
      return function () {
        controller.abort();
      };
    },
    [apiKey, query]
  );

  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <ResultsCount movies={movies} />
      </NavBar>
      <Main>
        {isLoading && <Message message={"Loading..."} type={"loader"} />}
        {!isLoading && errorMessage && (
          <Message message={errorMessage} type={"error"} />
        )}
        {!isLoading && !errorMessage.length && (
          <ListBox>
            <MovieList
              movies={movies}
              handleSelectMovieClick={handleSelectMovieClick}
            />
          </ListBox>
        )}
        <ListBox>
          {selectedId ? (
            <>
              <MovieDetails
                movieID={selectedId}
                watched={watched}
                handleCloseMovieClick={handleCloseMovieClick}
                handleAddWatchedMovie={handleAddWatchedMovie}
              />
            </>
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                handleRemoveWatchedMovie={handleRemoveWatchedMovie}
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
