import './MoviePoster.css';
import upvote from '../icons/upvote.png'
import downvote from '../icons/downvote.png'
import movieDetails from '../data/movie_details';

function MoviePoster({ title, poster_path, vote_count, changeScore, id, showMovieDetails }) {
  return (
    <section className='MoviePoster' 
      onClick={() => showMovieDetails(movieDetails)}>
      <img src={poster_path} alt={`Poster for ${title}`} />

      <div className='VoteBox'>
        <img onClick={(event) => { //added stopPropagation so the clicking of up/downvote wouldnt trigger the parent sections onClick
          event.stopPropagation()
          changeScore(id, true)}} src={upvote} />

        <p>Votes: {vote_count}</p>

        <img onClick={(event) => {
          event.stopPropagation()
          changeScore(id, false)}} src={downvote} />
      </div>
    </section>
  )
}

export default MoviePoster;