// Définition d'une commande personnalisée pour le login
Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://127.0.0.1:8000/api/token/', {
    username,
    password
  }).then((response) => {
    expect(response.status).to.eq(200)
    localStorage.setItem('jwt', response.body.access)
  })
})
