// import moviePosters from '../data/movie_posters';
import MoviePoster from '../MoviePoster/MoviePoster';
import './MoviesContainer.css';

function MoviesContainer({ moviePosters, changeScore, setShowingDetails }) { 
  if (!moviePosters) return <p>Loading...</p>
  return (
      <section className='MoviesContainer'>
        {moviePosters.map(movie => {
          return (
            <MoviePoster
              id={movie.id}
              key={movie.id}
              poster_path={movie.poster_path}
              vote_count={movie.vote_count}
              changeScore={changeScore}
              setShowingDetails={setShowingDetails}
            />
          );
        })}
      </section>
  )
}
  
export default MoviesContainer;