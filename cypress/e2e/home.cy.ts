describe('Accueil - Liste des plantes', () => {
  beforeEach(() => {
    cy.login('testuser', 'testpassword')
    cy.visit('/')
  })

  it('Affiche une erreur si l’API échoue', () => {
    cy.intercept('GET', '**/plants', { forceNetworkError: true }).as('failLoad')
    cy.reload()
    cy.contains('Erreur lors du chargement des plantes').should('exist')
  })
})
