import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMoviePage";
import MovieCredits from "../components/movieCredits";
import SimilarMovies from "../components/similarMovies";
import { getMovie, getMovieCredits } from "../api/tmdb-api";

const MovieDetailsExtensionPage = () => {
  const { id } = useParams();

  // ✅ Fetch movie details
  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
  } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });

  // ✅ Fetch credits
  const {
    data: credits,
    error: creditsError,
    isLoading: creditsLoading,
  } = useQuery({
    queryKey: ["credits", { id }],
    queryFn: getMovieCredits,
  });

  if (movieLoading || creditsLoading) return <p>Loading...</p>;
  if (movieError || creditsError) return <p>Error loading data.</p>;
  if (!movie) return <p>Movie details not available.</p>;

  return (
    <PageTemplate movie={movie}>
      {credits && <MovieCredits credits={credits} />}
      <SimilarMovies movie={movie} /> {/* ✅ Correct way */}
    </PageTemplate>
  );
};

export default MovieDetailsExtensionPage;
