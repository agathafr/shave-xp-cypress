import shared from "../../shared"

class ForgotPassPage {

    constructor() {
        this.shared = shared
    }

    go() {
        cy.visit('/forgot-password')

        //checkpoint para garantir que estou indo para o lugar certo
        cy.get('form h1')
            .should('have.text', 'Recuperar senha')
    }

    submit(email) {
        cy.get('input[placeholder$=mail]')
            .type(email)

        cy.contains('button', 'Recuperar')
            .click()
    }
}

export default new ForgotPassPage() 