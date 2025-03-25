import PlantCard from '../../src/components/PlantCard.vue'

describe('PlantCard', () => {
  const plant = {
    id: 1,
    name: 'Monstera',
    plant_type: 'Tropicale',
    description: 'Belle plante verte',
    image: '/mock-image.jpg',
    lastWatered: '2024-03-10',
  }

  it('affiche le nom, la description et les liens', () => {
    cy.mount(PlantCard, {
      props: { plant },
    })

    cy.contains('Monstera').should('exist')
    cy.contains('Belle plante verte').should('exist')
    cy.get('img').should('have.attr', 'src', plant.image)
    cy.contains('Voir détails').should('have.attr', 'href', `/plant/${plant.id}`)
    cy.contains('Galerie Photos').should('have.attr', 'href', `/plant/${plant.id}/photos`)
  })
})
