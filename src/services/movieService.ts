import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const token = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (
  query: string, page: number
): Promise<FetchMoviesResponse> => {
  const response = await axios.get<FetchMoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        page
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};