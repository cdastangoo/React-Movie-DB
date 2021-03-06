import React, { useEffect } from 'react';
import { useHomeFetch } from '../hooks/useHomeFetch';
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
import NoImage from '../images/no_image.jpg';

import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumbnail from './Thumbnail';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';

const Home = () => {
  useEffect(() => {
    document.title = "React Movie DB";
  }, []);

  const {
    movies,
    loading,
    error,
    errorMessage,
    searchTerm,
    setSearchTerm,
    setIsLoadingMore
  } = useHomeFetch();

  if (error) return <div>{errorMessage}</div>;

  return (
    <>
      {!searchTerm && movies.results[0] ?
        <HeroImage
            image={IMAGE_BASE_URL + BACKDROP_SIZE + movies.results[0].backdrop_path}
            title={movies.results[0].original_title}
            text={movies.results[0].overview}
        />
      : null }
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
        {movies.results.map(movie => (
          <Thumbnail
              key={movie.id}
              clickable
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : NoImage
              }
              movieId={movie.id}
          />
        ))}
      </Grid>

      {movies.page < movies.total_pages && !loading
          ? <Button text='Load More' callback={() => setIsLoadingMore(true)} />
          : <Spinner />
      }
    </>
  );
};

export default Home;
