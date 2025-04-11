import { useParams } from 'react-router-dom';
import './MovieDetails.css';
import { useEffect, useState } from 'react';

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState(null)
  const [movieNotFound, setMovieNotFound] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { movieId } = useParams()

  useEffect(() => {
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${movieId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Movie ID ${movieId} not found. Please try again.`)
      }
      return response.json()
    })
    .then(data => {
      if (!data.id) {
        setMovieNotFound(true)
      } else {
        setMovieDetails(data)
      }
    })
    .catch((err) => {
      console.error(err.message)
      setErrorMessage(err.message)
      setMovieNotFound(true)
    })
}, [movieId])

  if (movieNotFound) {
    return (
      <section className="ErrorMessage">
        <p>{errorMessage}</p>
      </section>
    )
  }
  if (!movieDetails) return <p>Loading...</p>

  return (
    <section className="MovieDetails">
      <img src={movieDetails.backdrop_path} alt={`Backdrop for ${movieDetails.title}`}/>

      <div className="DetailsBox">
        <h2>{movieDetails.title}</h2>
        <div className='GenreContainer'>
          {movieDetails.genre_ids.map((genre, index) => (
            <span key={index} className="GenreBox">{genre}</span>
          ))}
        </div>
        <p>{movieDetails.overview}</p>
      </div>
    </section>
  )
}

export default MovieDetails