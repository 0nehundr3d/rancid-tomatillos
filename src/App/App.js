import './App.css';
import { useEffect, useState } from 'react';
// import searchIcon from '../icons/search.png';

// Example imports (for later):
// import moviePosters from '../data/movie_posters';
// import movieDetails from '../data/movie_details'; //mock data

// import MovieDetails from '../MovieDetails/MovieDetails'; //function
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails'
import homeIcon from '../icons/home.png'

function App() {
  const [moviePosters, setMoviePosters] = useState([])
  const [showingDetails, setShowingDetails] = useState([false, null])

  useEffect(() => {
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies`)
      .then((response) => response.json())
      .then((data) => {
        setMoviePosters(data)
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, [])

  const changeScore = (id, upVoted) => {
    const findMovie = moviePosters.find( movie => movie.id === id)
    if (!findMovie) return

    const updatedVote = upVoted
      ? findMovie.vote_count + 1
      : findMovie.vote_count - 1
      
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote_direction: upVoted ? 'up' : 'down' })
    })
      .then(response => response.json())
      .then(updatedMovie => {
        const updatedList = moviePosters.map(movie => 
          movie.id === id ? { ...movie, ...updatedMovie } : movie
        )
        setMoviePosters(updatedList)
      })
      .catch(error => console.error("Failed to update vote count:", error))
  }

  
  return (
    <main className='App'>
      <header>
        <h1>rancid tomatillos</h1>
        { showingDetails[0] &&
        <div className='HomeButton'>
          <img src={homeIcon} alt="Home Button" onClick={() => {setShowingDetails([false, null])}}/>
        </div>
        }
      </header>

      { !showingDetails[0] && 
        <MoviesContainer 
          moviePosters={moviePosters} 
          changeScore={changeScore}
          setShowingDetails={setShowingDetails}
        />}

      { showingDetails[0] &&
        <MovieDetails
        movie_id={showingDetails[1]}
        />}
    </main>
  )
}
export default App;