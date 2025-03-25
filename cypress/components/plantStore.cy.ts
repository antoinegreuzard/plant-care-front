import { createPinia, setActivePinia } from 'pinia'
import { usePlantStore } from '../../src/stores'

describe('plantStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Charge les plantes correctement', () => {
    const fakePlants = [
      { id: 1, name: 'Aloe Vera', plant_type: 'succulente' },
      { id: 2, name: 'Ficus', plant_type: 'arbre' },
    ]

    cy.intercept('GET', '**/plants', {
      statusCode: 200,
      body: fakePlants,
    }).as('getPlants')

    const store = usePlantStore()

    cy.wrap(store.loadPlants()).then(() => {
      expect(store.plants.length).to.eq(2)
      expect(store.plants[0].name).to.eq('Aloe Vera')
    })
  })

  it('Gère une erreur API', () => {
    cy.intercept('GET', '**/plants', { statusCode: 500 }).as('failPlants')

    const store = usePlantStore()

    cy.wrap(store.loadPlants()).then(() => {
      expect(store.error).to.eq('Erreur lors du chargement des plantes.')
    })
  })
})
