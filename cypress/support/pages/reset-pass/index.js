class ResetPassPage {
    go(token) {
        cy.visit('/reset-password?token=' + token)

        cy.get('form h1')
            .should('have.text', 'Resetar senha')
    }
}

export default new ResetPassPage()