import './MovieDetails.css';

function MovieDetails({ movie_id }) {
  useEffect(() => {
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com//api/v1/movies/${movie_id}`)
    .then(((response) => response.json()))
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.log("Failed to fetch movie details:", err))
  })
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