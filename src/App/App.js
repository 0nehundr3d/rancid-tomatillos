import './App.css';
import { useState } from 'react';
import searchIcon from '../icons/search.png';

// Example imports (for later):
// import { useState, useEffect } from 'react';
import moviePosters from '../data/movie_posters';
// import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';

function App() {
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
      </header>
      <MoviesContainer moviePosters={moviePosters} changeScore={changeScore}/>
    </main>
  );
}

export default App;
