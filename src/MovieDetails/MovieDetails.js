import { useParams } from 'react-router-dom';
import './MovieDetails.css';
import { useEffect, useState } from 'react';

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState(null)
  const { movieId } = useParams()

  useEffect(() => {
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${movieId}`)
    .then(((response) => response.json()))
    .then((data) => {
      setMovieDetails(data)
    })
    .catch((err) => console.log("Failed to fetch movie details:", err))
  }, [movieId])

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

export default MovieDetails;

  // const { backdrop_path, title, genre_ids, overview } = movie

  // return (
  //   <section className='MovieDetails'>
  //     /* <img src={backdrop_path} alt={`Backdrop for ${title}`} />

  //     <div className="DetailsBox">
  //       <h2>{movie.title}</h2>
  //         <div className="GenreContainer">
  //           {genre_ids.map((genre, index) => (
  //             <span key={index} className="GenreBox">{genre}</span>
  //           ))}
  //         </div>
  //       <p>{movie.overview}</p>
  //     </div> */
  //   </section>
  // );