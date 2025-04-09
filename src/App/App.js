import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
// import searchIcon from '../icons/search.png';

// Example imports (for later):
// import moviePosters from '../data/movie_posters';
// import movieDetails from '../data/movie_details'; //mock data

// import MovieDetails from '../MovieDetails/MovieDetails'; //function
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails'
import MissingPage from '../MissingPage/MissingPage'
import homeIcon from '../icons/home.png'

function App() {
  const [moviePosters, setMoviePosters] = useState([])
  const [showingDetails, setShowingDetails] = useState([false, null])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      return response.json()
    })
    .then((data) => setMoviePosters(data))
    .catch((err) => {
      console.error("Fetch failed:", err)
      setError(true); // Flag error for conditional rendering
    })
}, []);

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

        <Routes>
          <Route path="/" element={<MoviesContainer moviePosters={moviePosters} changeScore={changeScore} />} />
          <Route path="/missing_page" element={<MissingPage />} />
          <Route path='*' element={<Navigate to="/missing_page" replace />} />
        </Routes>

      { showingDetails[0] &&
        <MovieDetails
        movie_id={showingDetails[1]}
        />}


      {error && <p>Something went wrong. Please try again later.</p>}
    </main>
  )
}
export default App;