// https://docs.cypress.io/api/introduction/api.html


describe('App test', () => {
  
  const randomNumber = Math.floor(Math.random() * 1000) + 1

  it('can register a user', () => {
    cy.visit('/register')
    cy.get('#name').type('test')
    cy.get('#email').type('test@test.test' + randomNumber)
    cy.get('#password').type('test')
    cy.get('.bg-blue-500').click()
	cy.location().should((location) => {
  		expect(location.pathname).to.eq('/')
	})
  })

  it('an invalid user cant login', () => {
    cy.visit('/dashboard')
    cy.get('.max-w-sm > :nth-child(2) > .w-full').type('notvalid@test.test')
    cy.get(':nth-child(3) > .w-full').type('test')
    cy.get('.bg-blue-500').click()
    cy.location().should((location) => {
  		expect(location.pathname).to.eq('/')
	})
  })

  it('a valid user can login, are redirected to the dashboard and can logout', () => {
    cy.visit('/')
    cy.get('.max-w-sm > :nth-child(2) > .w-full').type('test@test.test' + randomNumber)
    cy.get(':nth-child(3) > .w-full').type('test')
    cy.get('.bg-blue-500').click()
    cy.url().should('include', '/dashboard')
    cy.visit('/')
    cy.url().should('include', '/dashboard')
    cy.get('[href="#"]').click();
    cy.location().should((location) => {
  		expect(location.pathname).to.eq('/')
	})
  })
})
