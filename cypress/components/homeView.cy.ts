import HomeView from '../../src/views/HomeView.vue'

describe('HomeView', () => {
  it('affiche le titre et le champ de recherche', () => {
    cy.intercept('GET', '**/plants', {
      results: [],
      count: 0,
      next: null,
      previous: null,
    }).as('emptyPlants')

    cy.mount(HomeView)
    cy.wait('@emptyPlants')
    cy.contains('🌱 Mes Plantes').should('exist')
    cy.contains('Aucune plante disponible.').should('exist')
  })
})
