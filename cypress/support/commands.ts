Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'http://127.0.0.1:8000/api/token/',
    body: { username, password },
    failOnStatusCode: false // Empêche Cypress de planter en cas d'erreur
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Échec de l'authentification : ${response.body.detail}`)
    }

    const token = response.body.access
    localStorage.setItem('jwt', token)
    cy.setCookie('jwt', token)
    cy.visit('/')
  })
})
