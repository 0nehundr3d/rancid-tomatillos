import './MoviePoster.css';

function MoviePoster({ title, poster_path, vote_count }) {
  return (
    <section className='MoviePoster'>
        <img src={poster_path} alt={`Poster for ${title}`} />
      <div className='VoteBox'>
        <p>Votes: {vote_count}</p>
      </div>
    </section>
  );
}

export default MoviePoster;