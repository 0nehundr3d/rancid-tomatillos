import './App.css';
import { useState } from 'react';
import searchIcon from '../icons/search.png';
import homeIcon from '../icons/home.png';

// Example imports (for later):
// import { useState, useEffect } from 'react';
import moviePosters from '../data/movie_posters';
import movieDetails from '../data/movie_details'; //mock data

import MovieDetails from '../MovieDetails/MovieDetails'; //function
import MoviesContainer from '../MoviesContainer/MoviesContainer';

function App() {
  const [selectedMovie, showMovieDetails] = useState(null) // Tracking if movie poster has been clicked
  
  const [scores, setScores] = useState(moviePosters.reduce((acc, movie) => {
    acc[movie.id] = movie.vote_count
    return acc
  }, {}))

  function changeScore(movieId, upvote) {
    const score = upvote ? 1 : -1
    const movieIndex = moviePosters.findIndex(movie => movie.id === movieId)

    let newScores = structuredClone(scores)
    newScores[movieId.toString()] += score

    moviePosters[movieIndex].vote_count += score
    
    setScores(newScores)
  }

  return (
    <main className='App'>
      <header>
        <h1>rancid tomatillos</h1>
          {selectedMovie && (
            <button className="HomeButton" onClick={() => showMovieDetails(null)}>
              <img src={homeIcon} alt="Home" />
            </button>
          )}
      </header>

      {selectedMovie ? (
          <MovieDetails movie={selectedMovie} />
        ) : (   //similar to an if/else this is saying  
                // If a movie has been selected, show the details view
                // Otherwise show all movie posters
          <MoviesContainer 
            moviePosters={moviePosters} 
            changeScore={changeScore}
            showMovieDetails={showMovieDetails} />
      )}
    </main>
  )
}

export default App;
