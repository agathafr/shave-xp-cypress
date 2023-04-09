class SharedSteps {

    noticeErrorShouldBe(message) {
        cy.get('.notice-container')
            .should('be.visible')
            .find('.error p', { timeout: 10000 })
            .should('have.text', message)
    }

    noticeSuccessShouldBe(message) {
        cy.get('.notice-container')
            .should('be.visible')
            .find('.success p', { timeout: 10000 })
            .should('have.text', message)
    }

    alertShouldBe(message) {
        cy.get('.alert-error')
            .should('be.visible')
            .should('have.text', message)
    }
}

export default new SharedSteps()