Cypress.Commands.add('login', (username, password) => {
  const tryLogin = (url) => {
    return cy.request({
      method: 'POST',
      url: `${url}/api/token/`,
      body: { username, password },
      failOnStatusCode: false
    })
  }

  tryLogin('http://localhost:8000').then((response) => {
    if (response.status === 200) {
      const token = response.body.access
      localStorage.setItem('jwt', token)
      cy.setCookie('jwt', token)
      cy.visit('/')
    } else {
      // Si localhost échoue, on tente avec 127.0.0.1
      tryLogin('http://127.0.0.1:8000').then((response2) => {
        if (response2.status !== 200) {
          throw new Error(`Échec de l'authentification : ${response2.body.detail}`)
        }

        const token = response2.body.access
        localStorage.setItem('jwt', token)
        cy.setCookie('jwt', token)
        cy.visit('/')
      })
    }
  })
})
