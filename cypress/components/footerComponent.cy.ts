import FooterComponent from '../../src/components/FooterComponent.vue'

describe('FooterComponent', () => {
  it('affiche le texte du footer avec l’année actuelle', () => {
    const year = new Date().getFullYear()
    cy.mount(FooterComponent)
    cy.contains(`© ${year} Plant Care - Tous droits réservés`).should('exist')
  })
})
