
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {
            const user = {
                name: 'Agatha',
                email: 'agathafranca@outlook.com',
                password: 'pwd456'
            }

            loginPage.submit(user.email, user.password)

            shaversPage.header.userShouldLoggedIn(user.name)
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
    })
})