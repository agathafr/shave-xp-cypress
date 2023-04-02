import forgotPass from '../support/pages/forgot-pass'

describe('esqueci minha senha', () => {
    it('deve poder solicitar o resgate de senha', () => {
        forgotPass.go()
        forgotPass.submit()

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
        forgotPass.noticeShouldBe(message)
    })
})