import './MovieDetails.css';

function MovieDetails({ movie }) {
  const { backdrop_path, title, genre_ids, overview } = movie

  return (
    <section className='MovieDetails'>
      <img src={backdrop_path} alt={`Backdrop for ${title}`} />

      <div className="DetailsBox">
        <h2>{movie.title}</h2>
          <div className="GenreContainer">
            {genre_ids.map((genre, index) => (
              <span key={index} className="GenreBox">{genre}</span>
            ))}
          </div>
        <p>{movie.overview}</p>
      </div>
    </section>
  );
}

export default MovieDetails;