import forgotPass from '../support/pages/forgot-pass'
import resetPage from '../support/pages/reset-pass'

describe('esqueci minha senha', () => {
    it('deve poder solicitar o resgate de senha', () => {

        const user = {
            name: 'João Esquecido',
            email: 'joao@gmail.com',
            password: 'pwd123',
            is_shaver: false
        }

        cy.createUser(user)
        forgotPass.go()
        forgotPass.submit(user.email)

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
        forgotPass.noticeShouldBe(message)
    })

    it('deve poder cadastrar uma nova senha', () => {

        const user = {
            name: 'Will Souza',
            email: 'will@yahoo.com',
            password: 'pwd123',
            is_shaver: false
        }

        cy.createUser(user)
        cy.recoveryPass(user.email)
        cy.getToken(user.email)

        resetPage.go(Cypress.env('passToken'))
    })
})