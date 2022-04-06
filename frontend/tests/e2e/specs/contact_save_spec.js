
describe('Cadastro de Contatos', () => {

    const user = { email: 'joao@yahoo.com', password: 'pwd123' }

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

        cy.doLogin(user.email, user.password)
        cy.get('.dashboard', {timeout: 5000}).should('be.visible')
    })

    describe('Novo Contato', () => {
        let contact = {
            name: 'Fernando Papito',
            number: '119999999999',
            description: 'Solicitar orçamento para Consultoria em QA e DevOps.'
        }

        describe('Quando submeto o cadastro completo', () => {
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Deve cadastrar esse contato', () => {
                cy.contactList().contains(contact.name)
            })
        })

        describe('Quando submeto o cadastro sem o nome', () => {

            let contact = {
                number: '119999999999',
                description: 'Solicitar orçamento para Consultoria em QA e DevOps.'
            }

            const expectNotice = 'Nome é obrigatório.'

            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it(`Deve exibir a notificação ${expectNotice.replace(/[^a-zA-Z ]/g, '')}`, () => {
                cy.alertName().contains(expectNotice)
            })
        })

        describe('Quando submeto o cadastro sem o whatsapp', () => {

            let contact = {
                name: 'Fernando Papito',
                description: 'Solicitar orçamento para Consultoria em QA e DevOps.'
            }

            const expectNotice = 'WhatsApp é obrigatório.'
    
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it(`Deve exibir a notificação ${expectNotice.replace(/[^a-zA-Z ]/g, '')}`, () => {
                cy.alertNumber().contains(expectNotice)
            })
        })

        describe('Quando submeto o cadastro sem o assunto', () => {

            let contact = {
                name: 'Fernando Papito',
                number: '119999999999'
            }

            const expectNotice = 'Assunto é obrigatório.'

            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it(`Deve exibir a notificação ${expectNotice.replace(/[^a-zA-Z ]/g, '')}`, () => {
                cy.alertDesc().contains(expectNotice)
            })
        })



    })

})