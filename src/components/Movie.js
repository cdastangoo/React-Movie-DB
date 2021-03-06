import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieFetch } from '../hooks/useMovieFetch';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import NoImage from '../images/no_image.jpg';

import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';

const Movie = () => {
  const { movieId } = useParams();
  const { data: movie, loading, error, errorMessage } = useMovieFetch(movieId);

  useEffect(() => {
    document.title = "React Movie DB | " + movie.original_title;
  }, [movie]);

  if (loading) return <Spinner />;
  if (error) return <div>{errorMessage}</div>;

  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
          time={movie.runtime}
          budget={movie.budget}
          revenue={movie.revenue}
      />
      {movie.actors.length > 0
        ? <Grid header='Actors'>
            {movie.actors.map(actor => (
                <Actor
                    key={actor.credit_id}
                    name={actor.name}
                    character={actor.character}
                    imageUrl={actor.profile_path
                        ? IMAGE_BASE_URL + POSTER_SIZE + actor.profile_path
                        : NoImage
                    }
                />
            ))}
          </Grid>
        : null
      }
    </>
  );
};

export default Movie;