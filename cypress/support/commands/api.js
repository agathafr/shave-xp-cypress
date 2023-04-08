const APP_API_URL = 'http://localhost:3333'
const APP_API_HELPER_URL = 'http://localhost:5000'

Cypress.Commands.add('deleteUser', (user) => {
    cy.request({
        method: 'DELETE',
        url: `${APP_API_HELPER_URL}/user/` + user.email
    }).then(function (response) {
        expect(response.status).to.eq(204)
    })
})

Cypress.Commands.add('createUser', (user) => {
    cy.request({
        method: 'POST',
        url: `${APP_API_HELPER_URL}/user`,
        body: user
    }).then(function (response) {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('recoveryPass', (email) => {
    cy.request({
        method: 'POST',
        url: `${APP_API_URL}/password/forgot`,
        body: { email: email }
    }).then(result => {
        expect(result.status).to.eql(204)
    })
})

Cypress.Commands.add('getToken', (email) => {
    cy.request({
        method: 'GET',
        url: `${APP_API_HELPER_URL}/token/` + email
    }).then(result => {
        expect(result.status).to.eql(200)
        cy.log(result.body.token)
        Cypress.env('passToken', result.body.token)
    })
})

Cypress.Commands.add('apiLogin', (user) => {
    cy.request({
        method: 'POST',
        url: `${APP_API_URL}/sessions`,
        body: { email: user.email, password: user.password }
    }).then(response => {
        expect(response.status).to.eql(200)

        const { user, token } = response.body

        window.localStorage.setItem('@ShaveXP:token', token)
        window.localStorage.setItem('@ShaveXP:user', JSON.stringify(user))
    })

    cy.visit('/')
})