import shared from "../../shared"

class ResetPassPage {

    constructor() {
        this.shared = shared
    }

    go(token) {
        cy.visit('/reset-password?token=' + token)

        cy.get('form h1')
            .should('have.text', 'Resetar senha')
    }

    submit(newPass, confirmPass) {
        cy.get('input[placeholder="Nova senha"]')
            .type(newPass)

        cy.get('input[placeholder="Confirmação da senha"]')
            .type(confirmPass)

        cy.contains('button', 'Alterar senha')
            .click()
    }
}

export default new ResetPassPage()