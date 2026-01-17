import { useState, useEffect } from "react";
import { apiKey } from "../data/constants";

function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
          { signal: controller.signal },
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
  }, [apiKey, query]);

  return { movies, isLoading, errorMessage };
}

export { useMovies };
