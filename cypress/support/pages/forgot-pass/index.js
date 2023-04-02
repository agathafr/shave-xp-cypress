class ForgotPassPage {
    go() {
        cy.visit('/forgot-password')

        //checkpoint para garantir que estou indo para o lugar certo
        cy.get('form h1')
            .should('have.text', 'Recuperar senha')
    }
}