// Mock data to use for testing:
import posters from '../fixtures/movie_posters.json' // (we've added mock data to this file for you!)
// import details from '../fixtures/movie_details.json' (you will need to add your own mock data to this file!)

describe('Main Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies', {
      statusCode: 200,
      body: posters
    })
    cy.visit('http://localhost:3000/')
  })

  it('displays title on page load', () => {
    cy.get('h1').contains('rancid tomatillos')    
    cy.get('.MoviePoster').should('have.length', 4)
  })

  it('displays the first movie poster', () => {
    cy.get('.MoviePoster')
      .first()
      .within(() => {
        cy.get('img').should('have.attr', 'alt', 'poster for The Dark Knight')
        cy.contains('Votes: 32544')
    })
  })

  it('displays the last movie poster', () => {
    cy.get('.MoviePoster')
      .last()
      .within(() => {
        cy.get('img').should('have.attr', 'alt', 'poster for Pulp Fiction')
        cy.contains('Votes: 27642')
    })
  })

  it('provides 200 if posters are found', () => {
    cy.intercept('GET', 'https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies', {
      statusCode: 200,
      body: posters
    }).as('getMovies')
    cy.visit('http://localhost:3000/')
    cy.wait('@getMovies').its('response.statusCode').should('eq', 200)
  })

  it('provides 500 error if something is wrong', () => {
    cy.intercept('GET', 'https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('getMoviesError')
    cy.visit('http://localhost:3000/')
    cy.wait('@getMoviesError').its('response.statusCode').should('eq', 500)
    cy.contains('Something went wrong. Please try again later.')
  })

  it('displays an error for an invalid movie ID', () => {
    cy.visit('http://localhost:3000/9999999')
    cy.contains('Movie ID 9999999 not found. Please try again.')
  })
})