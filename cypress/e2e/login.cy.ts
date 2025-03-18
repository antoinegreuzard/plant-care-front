describe('Login', () => {
  it('Se connecte et affiche Déconnexion', () => {
    cy.visit('/login')
    cy.get('input[name=username]').type('testuser')
    cy.get('input[name=password]').type('testpassword')
    cy.get('button').contains('Connexion').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.contains('Déconnexion').should('exist')
  })

  it('Se déconnecte correctement', () => {
    cy.get('button').contains('Déconnexion').click()
    cy.contains('Connexion').should('exist')
  })
})
