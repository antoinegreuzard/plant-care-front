describe('Ajout de plante', () => {
  it('Ajoute une plante', () => {
    cy.login('testuser', 'testpassword')
    cy.visit('/add-plant')
    cy.get('input[name=name]').type('Monstera')
    cy.get('button').contains('Ajouter').click()
    cy.contains('Plante ajoutée avec succès !').should('exist')
  })
})
