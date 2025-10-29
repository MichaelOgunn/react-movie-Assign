import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getPopularTV } from "../api/tmdb-api";
import PageTemplate from "../components/templateTVShowListPage";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToMustWatch from '../components/cardIcons/mustWatch'

const PopularTVPage = (props) => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['popular'],
        queryFn: getPopularTV,
    });

    if (isPending) {
    return < Spinner/>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const shows = data.results;
  return (
     <PageTemplate
      title='Popular TV Shows'
      shows={shows}
      action={(show) =>{
        return (
          <>
            <AddToFavoritesIcon movie={show} />
            <AddToMustWatch movie={show} />
          </>
        );
        
      }
    }
    />
  );
}
export default PopularTVPage;