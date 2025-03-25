describe('Login', () => {
  const username = 'testuser'
  const password = 'testpassword'

  const login = () => {
    cy.visit('/login')
    cy.get('input[name=username]').should('be.visible').type(username)
    cy.get('input[name=password]').should('be.visible').type(password)
    cy.get('button').contains('Connexion').should('be.visible').click()
  }

  it('Se connecte et affiche Déconnexion', () => {
    login()

    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.contains('Déconnexion', { timeout: 5000 }).should('exist')
  })

  it('Se connecte puis se déconnecte correctement', () => {
    login()

    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.contains('Déconnexion', { timeout: 5000 }).should('exist').click()

    cy.url().should('eq', Cypress.config().baseUrl + '/login')
    cy.contains('Connexion', { timeout: 5000 }).should('exist')
  })
})

describe('Protection des routes', () => {
  const protectedRoutes = ['/', '/add-plant', '/plant/1']

  protectedRoutes.forEach((route) => {
    it(`redirection vers /login depuis ${route} sans token`, () => {
      localStorage.removeItem('jwt')
      cy.visit(route)
      cy.url().should('include', '/login')
    })
  })
})

