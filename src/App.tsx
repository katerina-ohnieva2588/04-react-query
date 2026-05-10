import styles from "./App.module.css";
import { useState } from "react";
import { fetchMovies } from "./services/movieService";
import type { Movie } from "./types/movie";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MovieModal from "./components/MovieModal/MovieModal";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<null | Movie>(null);

  const handleSearch = async () => {
    setError(null);
    setLoading(true);
    setMovies([]);

    try {
      const data = await fetchMovies(query);
      setMovies(data.results);

      if (data.results.length === 0) {
        setError("No movies found");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

   return (
    <div className={styles.container}>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movie"
      />

      <button onClick={handleSearch}>Search</button>

      {loading && <Loader />}

      {error && <ErrorMessage />}

      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

    </div>
  );
}

export default App;