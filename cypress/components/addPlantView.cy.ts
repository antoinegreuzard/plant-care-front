import AddPlantView from '../../src/views/AddPlantView.vue'

describe('AddPlantView', () => {
  it('affiche le formulaire d’ajout de plante', () => {
    cy.mount(AddPlantView)
    cy.get('input[name="name"]').should('exist')
    cy.get('select[name="plant_type"]').should('exist')
    cy.get('textarea[name="description"]').should('exist')
    cy.get('input[name="location"]').should('exist')
    cy.get('button').contains('Ajouter').should('exist')
  })
})
