import './MoviePoster.css';

function MoviePoster({ title, poster_path, vote_count }) {
  return (
    <section className='MoviePoster'>
      <img src={poster_path} alt={`Poster for ${title}`} />
      <h2>{vote_count}</h2>
    </section>
  );
}

export default MoviePoster;