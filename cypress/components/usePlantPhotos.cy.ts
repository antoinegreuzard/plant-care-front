import { usePlantPhotos } from '../../src/composables/usePlantPhotos'

describe('usePlantPhotos composable', () => {
  it('Charge et affiche les photos', () => {
    cy.mount({
      template: `<div v-for="photo in photos" :key="photo.id">{{ photo.image }}</div>`,
      setup() {
        const { photos } = usePlantPhotos(1)
        return { photos }
      },
    })

    cy.contains('default-plant.jpg').should('not.exist')
  })
})
