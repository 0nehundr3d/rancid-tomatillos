describe('Movie Details', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
      statusCode: 200,
      body: [{
        id: 389,
        poster_path: "https://image.tmdb.org/t/p/original//ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
        title: "12 Angry Men",
        vote_count: 8535
        },
        {
        id: 762441,
        poster_path: "https://image.tmdb.org/t/p/original//hU42CRk14JuPEdqZG3AWmagiPAP.jpg",
        title: "A Quiet Place: Day One",
        vote_count: 1755
        },
        {
        id: 945961,
        poster_path: "https://image.tmdb.org/t/p/original//b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
        title: "Alien: Romulus",
        vote_count: 990
        }]
    })
    .visit("http://localhost:3000/")
  })

  it("Should show all details when a movie is clicked on", () => {
    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/389", {
      statusCode:200,
      body: {
        "backdrop_path": "https://image.tmdb.org/t/p/original//qqHQsStV6exghCM7zbObuYBiYxw.jpg",
        "genre_ids": [
          "Drama"
        ],
        "id": 389,
        "original_language": "en",
        "overview": "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and shut case soon becomes a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other.",
        "popularity": 52.003,
        "poster_path": "https://image.tmdb.org/t/p/original//ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
        "release_date": "1957-04-10",
        "title": "12 Angry Men"
      }
    })
    .get(".MoviePoster img").first().click()
    .get(".MovieDetails img").should("exist")
    .get(".DetailsBox h2").should("have.text", "12 Angry Men")
    .get(".GenreContainer ").should("have.length", 1)
    .first().should("have.text", "Drama")
    .get(".DetailsBox p").should("have.text", "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and shut case soon becomes a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other.")
  })

  it("Should increase the movies vote count by one when upvoted", () => {
    cy.intercept("PATCH", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/389", {
      statusCode: 200,
      body: {
        "id": 389,
        "poster_path": "https://image.tmdb.org/t/p/original//ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
        "title": "12 Angry Men",
        "vote_count": 8536
    }
    })
    .get(".MoviePoster").first().find("#upvote").click()
    .get(".MoviePoster p").first().should("have.text", "Votes: 8536")
  })
})