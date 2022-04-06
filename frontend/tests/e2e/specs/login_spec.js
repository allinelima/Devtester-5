

describe('Login', () => {

    const user = { email: 'fernando@qaninja.com.br', password: 'pwd123' }

    before(()=> {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/user',
            headers: { 'Content-Type': 'application/json' },
            body: user,
            failOnStatusCode: false
        }).then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })

    context('Quando submeto credenciais validas', ()=> {
        before(()=> {
            cy.doLogin(user.email, user.password)
        })

        it('Deve exibir a área logada', ()=> {
            cy.contains('h4', 'Seu gerenciador digital de contatos').should('be.visible')
        })
    })

    context('Quando submeto senha incorreta', () => {

        const expectMessage = 'Email e/ou senha incorretos!'

        before(()=> {
            cy.doLogin(user.email, 'abc123')
        })

        it(`Deve exibir ${expectMessage.replace(/[^a-zA-Z ]/g, '')}`, ()=> {
            cy.loginAlert(expectMessage).should('be.visible')
        })
    })

    context('Quando não informo o email', () => {

        const expectMessage = 'Oops. Por favor informe o seu email'

        before(()=> {
            cy.doLogin('', user.password)
        })

        it(`Deve exibir ${expectMessage}`, ()=> {
            cy.loginAlert(expectMessage).should('be.visible')
        })
    })

    context('Quando não informo a senha', () => {

        const expectMessage = 'Oops. Por favor informe sua senha'

        before(()=> {
            cy.doLogin(user.email, '')
        })

        it(`Deve exibir ${expectMessage}`, ()=> {
            cy.loginAlert(expectMessage).should('be.visible')
        })
    })


})