import './MoviePoster.css';
import upvote from '../icons/upvote.png'
import downvote from '../icons/downvote.png'
import { Link } from 'react-router-dom'
// import movieDetails from '../data/movie_details';

function MoviePoster({ id, title, poster_path, vote_count, changeScore }) {
  return (
    <section className='MoviePoster'>
      <Link to={`/${id}`}>
      <img src={poster_path} alt={`poster for ${title}`} />
      </Link>

      {/* <h3>{title}</h3> */}

      <div className='VoteBox'>
        <img id="upvote" 
        onClick={(event) => { //added stopPropagation so the clicking of up/downvote wouldnt trigger the parent sections onClick
          event.stopPropagation()
          changeScore(id, true)
        }} 
        src={upvote} alt="Upvote button"
        />

        <p>Votes: {vote_count}</p>

        <img id="downvote" 
        onClick={(event) => {
          event.stopPropagation()
          changeScore(id, false)
        }} 
        src={downvote} alt="Downvote button"
        />
      </div>
    </section>
  )
}

export default MoviePoster;





// onClick={() => showMovieDetails(movieDetails)}
// {/* <div className='VoteBox'>
//         <img onClick={(event) => { //added stopPropagation so the clicking of up/downvote wouldnt trigger the parent sections onClick
//           event.stopPropagation()
//           changeScore(id, true)}} src={upvote} />

//         <p>Votes: {vote_count}</p>

//         <img onClick={(event) => {
//           event.stopPropagation()
//           changeScore(id, false)}} src={downvote} />
//       </div> */}