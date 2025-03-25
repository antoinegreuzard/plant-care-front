describe('Ajout de photo à une plante', () => {
  it('Upload une image et l’affiche dans la galerie', () => {
    cy.login('testuser', 'testpassword')
    cy.visit('/plant/1/photos')

    cy.get('input[type="file"]').selectFile('cypress/fixtures/plant.jpg', { force: true })
    cy.contains('Ajouter une photo').click()

    cy.get('img').should('exist')
  })
})
