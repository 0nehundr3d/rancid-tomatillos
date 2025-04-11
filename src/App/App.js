import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation, Link } from 'react-router-dom'

import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails'
import MissingPage from '../MissingPage/MissingPage'
import homeButton from '../icons/home.png'

function App() {
  const [moviePosters, setMoviePosters] = useState([])
  const [error, setError] = useState(false)

  const path = useLocation()

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
        {!(path.pathname === "/") && <Link to="/"><img className="HomeButton" src={homeButton} /></Link>}
      </header>

        <Routes>
          <Route path="/" element={<MoviesContainer moviePosters={moviePosters} changeScore={changeScore} />} />
          <Route path="/:movieId" element={<MovieDetails />} />
          <Route path="/missing_page" element={<MissingPage />} />
          <Route path='*' element={<Navigate to="/missing_page" replace />} />
        </Routes>


      {error && <p>Something went wrong. Please try again later.</p>}
    </main>
  )
}
export default App;