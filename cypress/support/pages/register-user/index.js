class RegisterUserPage {
    constructor() {
        this.alertError = '.alert-error'
    }

    go() {
        cy.visit('/signup')

        cy.get('form h1')
            .should('have.text', 'Faça seu cadastro')
    }

    submit(name = null, email = null, password = null) {
        this.go()

        cy.get('input[placeholder="Nome completo"]').as('name')
        cy.get('input[placeholder="Seu melhor email"]').as('email')
        cy.get('input[placeholder="Sua senha secreta"]').as('password')

        if (name) {
            cy.get('@name').type(name)
        }

        if (email) {
            cy.get('@email').type(email)
        }

        if (password) {
            cy.get('@password').type(password)
        }

        cy.contains('button', 'Cadastrar')
            .click()
    }

    noticeErrorShouldBe(message) {
        cy.get('.notice-container')
            .should('be.visible')
            .find('.error p')
            .should('have.text', message)
    }

    noticeSuccessShouldBe(message) {
        cy.get('.notice-container')
            .should('be.visible')
            .find('.success p')
            .should('have.text', message)
    }

    alertShouldBe(message) {
        cy.get(this.alertError)
            .should('be.visible')
            .should('have.text', message)
    }

    requiredFields(nameMessage, emailMessage, passwordMessage) {
        cy.get(this.alertError)
            .should('have.length', 3)
            .and(($small) => {
                expect($small.get(0).textContent).to.equal(nameMessage)
                expect($small.get(1).textContent).to.equal(emailMessage)
                expect($small.get(2).textContent).to.equal(passwordMessage)
            })
    }
}

export default new RegisterUserPage()