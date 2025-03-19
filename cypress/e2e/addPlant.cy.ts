describe('Ajout de plante', () => {
  it('Ajoute une plante', () => {
    const randomPlantName = `Plante_${Math.random().toString(36).substring(2, 8)}`

    cy.login('testuser', 'testpassword')
    cy.visit('/add-plant')

    cy.get('h1').should('contain', 'Ajouter une nouvelle plante')
    cy.get('input[name=name]').should('be.visible').type(randomPlantName)
    cy.get('textarea[name=description]').should('be.visible').type('Description')
    cy.get('input[name=location]').should('be.visible').type('Salon')
    cy.get('button').contains('Ajouter').should('be.visible').click()

    cy.contains('Plante ajoutée avec succès !', { timeout: 5000 }).should('exist')
  })
})
