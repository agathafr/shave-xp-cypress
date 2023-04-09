Cypress.Commands.add('deleteUser', (user) => {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('auth_api_helper_url')}/user/` + user.email
    }).then(function (response) {
        expect(response.status).to.eq(204)
    })
})

Cypress.Commands.add('createUser', (user) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('auth_api_helper_url')}/user`,
        body: user
    }).then(function (response) {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('recoveryPass', (email) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('app_api_url')}/password/forgot`,
        body: { email: email }
    }).then(result => {
        expect(result.status).to.eql(204)
    })
})

Cypress.Commands.add('getToken', (email) => {
    cy.request({
        method: 'GET',
        url: `${Cypress.env('auth_api_helper_url')}/token/` + email
    }).then(result => {
        expect(result.status).to.eql(200)
        cy.log(result.body.token)
        Cypress.env('passToken', result.body.token)
    })
})

Cypress.Commands.add('apiLogin', (user) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('app_api_url')}/sessions`,
        body: { email: user.email, password: user.password }
    }).then(response => {
        expect(response.status).to.eql(200)

        const { user, token } = response.body

        window.localStorage.setItem('@ShaveXP:token', token)
        window.localStorage.setItem('@ShaveXP:user', JSON.stringify(user))
    })

    cy.visit('/')
})