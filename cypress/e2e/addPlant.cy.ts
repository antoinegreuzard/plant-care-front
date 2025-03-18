describe('Ajout de plante', () => {
  it('Ajoute une plante', () => {
    cy.login('testuser', 'testpassword')
    cy.visit('/add-plant')

    cy.get('h1').should('contain', 'Ajouter une nouvelle plante') // Vérifie que la page a bien chargé
    cy.get('input[name=name]').should('be.visible').type('Monstera')
    cy.get('button').contains('Ajouter').should('be.visible').click()

    cy.contains('Plante ajoutée avec succès !', { timeout: 5000 }).should('exist')
  })
})
