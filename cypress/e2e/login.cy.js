
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it.only('deve logar com sucesso', () => {
            cy.fixture('users-login').then(function(data) {
                loginPage.submit(data.email, data.password)

                shaversPage.header.userShouldLoggedIn(data.name)
            })
        })

        it('não deve logar com senha incorreta', () => {
            const user = {
                name: 'Agatha',
                email: 'agathafranca@outlook.com',
                password: '123456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.noticeShouldBe(message)
        })

        it('não deve logar com email não cadastrado', () => {
            const user = {
                name: 'Agatha',
                email: 'agathafranca@404.com',
                password: '123456'
            }

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
        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p) => {
            it(`não deve logar com a senha: ${p}`, () => {
                loginPage.submit('agathafranca@outlook.com', p)

                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('email no formato incorreto', () => {
        const emails = [
            'agatha&gmail.com',
            'agatha.com.br',
            '@gmail.com',
            '@',
            'agatha@',
            '121323',
            '@#@!3!@',
            'xpto123'
        ]

        emails.forEach((e) => {
            it(`não deve logar com o email no formato incorreto: ${e}`, () => {
                loginPage.submit(e, 'pwd456')

                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })
})