import forgotPass from '../support/pages/views/forgot-pass'
import resetPage from '../support/pages/views/reset-pass'
import loginPage from '../support/pages/views/login'
import shaversPage from '../support/pages/views/shavers'

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

    context('quando o usuário solicita resgate de senha', () => {

        const user = {
            name: 'Will Souza',
            email: 'will@yahoo.com',
            password: 'pwd123',
            is_shaver: false
        }

        beforeEach(() => {
            cy.createUser(user)
            cy.recoveryPass(user.email)
            cy.getToken(user.email)
        })

        it('deve poder cadastrar uma nova senha', () => {
            resetPage.go(Cypress.env('passToken'))
            resetPage.submit('abc123', 'abc123')
            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            resetPage.noticeShouldBe(message)
        })

        afterEach(() => {
            loginPage.submit(user.email, 'abc123')
            shaversPage.header.userShouldLoggedIn(user.name)
        })
    })

})