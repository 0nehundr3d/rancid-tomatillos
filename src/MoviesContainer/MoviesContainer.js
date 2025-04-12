// import moviePosters from '../data/movie_posters';
import { useState } from 'react';
import MoviePoster from '../MoviePoster/MoviePoster';
import SearchBar from '../SearchBar/SearchBar';
import './MoviesContainer.css';


function MoviesContainer({ moviePosters, changeScore, searchTerm }) { 

  if (!moviePosters) return <p>Loading...</p>

  const filteringMovies = moviePosters.filter(movie => 
    movie.title.toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <section className='MoviesContainer'>
        {filteringMovies.map(movie => {
          return (
            <MoviePoster
              id={movie.id}
              key={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              vote_count={movie.vote_count}
              changeScore={changeScore}
            />
          )
        })}
      </section>
    </>
  )
}
  
export default MoviesContainer;