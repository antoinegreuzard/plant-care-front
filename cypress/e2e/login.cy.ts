describe('Login', () => {
  it('Se connecte et affiche Déconnexion', () => {
    cy.visit('/login')
    cy.get('h1').should('contain', 'Connexion') // Vérifie que la page login a bien chargé
    cy.get('input[name=username]').should('be.visible').type('testuser')
    cy.get('input[name=password]').should('be.visible').type('testpassword')
    cy.get('button').contains('Connexion').should('be.visible').click()

    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.contains('Déconnexion', { timeout: 5000 }).should('exist')
  })

  it('Se déconnecte correctement', () => {
    cy.contains('Déconnexion', { timeout: 5000 }).should('exist').click()
    cy.contains('Connexion', { timeout: 5000 }).should('exist')
  })
})
