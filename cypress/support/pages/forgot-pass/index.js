class ForgotPassPage {
    go() {
        cy.visit('/forgot-password')

        //checkpoint para garantir que estou indo para o lugar certo
        cy.get('form h1')
            .should('have.text', 'Recuperar senha')
    }

    submit(email) {
        cy.get('input[placeholder$=mail]')
            typeof(email)

        cy.contains('button', 'Recuperar')
            .click()
    }

    noticeShouldBe(expectedText) {
        cy.get('.notice p')
            .should('be.visible')
            .should('have.text', expectedText)
    }
}