import './MoviePoster.css';
import upvote from '../icons/upvote.png'
import downvote from '../icons/downvote.png'

function MoviePoster({ title, poster_path, vote_count, changeScore, id }) {
  return (
    <section className='MoviePoster'>
        <img src={poster_path} alt={`Poster for ${title}`} />
      <div className='VoteBox'>
        <img onClick={() => {changeScore(id, true)}} src={upvote} />
        <p>Votes: {vote_count}</p>
        <img onClick={() => {changeScore(id, false)}} src={downvote} />
      </div>
    </section>
  );
}

export default MoviePoster;