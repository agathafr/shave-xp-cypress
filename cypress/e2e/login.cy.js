
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'
import data from '../fixtures/users-login.json'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it.only('deve logar com sucesso', () => {

            // Dado que eu tenho um NOVO usuário cadastrado
            const user = data.success

            cy.request({
                method: POST,
                url: 'http://localhost:3333/users',
                body: user
            }).then(function(response){
                expect(response.status).to.eq(201)
            })

            // Quando submeto o form de login com esse usuário
            loginPage.submit(user.email, user.password)

            // Então devo ser logado com sucesso
            shaversPage.header.userShouldLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {
            const user = data.invpass

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.noticeShouldBe(message)
        })

        it('não deve logar com email não cadastrado', () => {
            const user = data.email404

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.noticeShouldBe(message)
        })

        it('campos obrigatórios', () => {
            loginPage.submit()

            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })
    })

    context('senha muito curta', () => {

        data.shortpass.forEach((p) => {
            it(`não deve logar com a senha: ${p}`, () => {
                loginPage.submit('agathafranca@outlook.com', p)

                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('email no formato incorreto', () => {

        data.invemails.forEach((e) => {
            it(`não deve logar com o email no formato incorreto: ${e}`, () => {
                loginPage.submit(e, 'pwd456')

                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })
})