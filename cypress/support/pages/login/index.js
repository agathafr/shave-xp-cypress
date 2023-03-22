
class LoginPage {

    submit(email, password) {
        cy.visit('/')

        cy.get('input[placeholder$=email]').type(email)

        cy.get('input[placeholder*=senha]').type(password)

        cy.contains('button', 'Entrar') //button[text()="Entrar"]
            .click()
    }

    noticeShouldBe(message) {
        cy.get('.notice-container')
            .should('be.visible')
            .find('.error p')
            .should('have.text', message)
    }
}

export default new LoginPage()