import './MoviePoster.css';
import upvote from '../icons/upvote.png'
import downvote from '../icons/downvote.png'
// import movieDetails from '../data/movie_details';

function MoviePoster({ id, title, poster_path, vote_count, changeScore, setShowingDetails }) {
  return (
    <section className='MoviePoster'>
      <img onClick={() => {setShowingDetails([true, id])}} src={poster_path} alt={`Poster for movie ID ${id}`} />
      <h3>{title}</h3>

      <div className='VoteBox'>
        <img id="upvote" onClick={(event) => { //added stopPropagation so the clicking of up/downvote wouldnt trigger the parent sections onClick
          event.stopPropagation()
          changeScore(id, true)}} src={upvote} />

        <p>Votes: {vote_count}</p>

        <img id="downvote" onClick={(event) => {
          event.stopPropagation()
          changeScore(id, false)}} src={downvote} />
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