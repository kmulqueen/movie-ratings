import { useState, useCallback } from "react";
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
import { useMovies, useLocalStorageState } from "./hooks";
import { localStorageWatched } from "./data/constants";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const { movies, isLoading, errorMessage } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], localStorageWatched);

  function handleSelectMovieClick(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  const handleCloseMovieClick = useCallback(() => {
    setSelectedId(null);
  }, []);

  function handleAddWatchedMovie(movie) {
    setWatched((prevState) => [...prevState, movie]);
  }

  function handleRemoveWatchedMovie(movieID) {
    setWatched((prevState) =>
      prevState.filter((movie) => movie.imdbID !== movieID),
    );
  }

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
