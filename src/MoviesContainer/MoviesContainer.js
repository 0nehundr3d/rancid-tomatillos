import moviePosters from '../data/movie_posters';
import MoviePoster from '../MoviePoster/MoviePoster';
import './MoviesContainer.css';

function MoviesContainer({ moviePosters, changeScore, showMovieDetails }) { // Object destructuring {moviePosters} - saying that "you can now just go use moviePosters directly"
  return (
      <section className='MoviesContainer'>
        {moviePosters.map(movie => (
          <MoviePoster
            id={movie.id}
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_count={movie.vote_count}
            changeScore={changeScore}
            showMovieDetails={showMovieDetails}
          />
        ))}
      </section>
  )
}
  
export default MoviesContainer;