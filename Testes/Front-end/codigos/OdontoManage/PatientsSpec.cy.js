describe('OdontoManage Patients', () => {
    beforeEach(() => {
        cy.viewport(1366, 768)
    })
    it('criar um novo paciente', () => {
        cy.login()
        //clica em pacientes
        cy.get('a[href="/patients"]').click()
        //verifica se ta na rota de /patients
        cy.url().should('include', '/patients')
        //clica em botao de Novo Paciente
        cy.get('button').contains('Novo Paciente').click()
        //preenche os campos
        cy.get('input[id="name"]').type('Paciente Teste')
        //clica no radio button de masculino
        cy.contains('Masculino').click() 
        //preenche os campos de data de nascimento
        cy.get('input[id="birthDate"]').type('29/05/2002')
        //preenche o campo de cpf 
        cy.get('input[id="cpf"]').type('12345678901')
        //preenche o campo de rg
        cy.get('input[id="rg"]').type('123456789')
        //preenche o campo de telefone
        cy.get('input[id="phone"]').type('123456789')
        //preenche o campo de cep
        cy.get('input[id="cep"]').type('12345678')
        //preenche o campo de rua
        cy.get('input[id="street"]').type('Rua Teste')
        //preenche o campo de bairro
        cy.get('input[id="neighborhood"]').type('Bairro Teste')
        //preenche o campo de cidade
        cy.get('input[id="city"]').type('Cidade Teste')
        //preenche o campo de estado
        cy.get('input[id="state"]').type('Estado Teste')
        //clica no botao de Cadastrar
        cy.get('button').contains('Cadastrar').click()
        //verifica se o paciente foi criado
        cy.contains('Paciente Teste')
    })
    it('editar um paciente', () => {
        cy.login()
        //clica em pacientes
        cy.get('a[href="/patients"]').click()
        //verifica se ta na rota de /patients
        cy.url().should('include', '/patients')
        //clica no botao de editar
        cy.get('div').contains('Rua Teste').parent().parent().find('td').find('svg').eq(0).click()
        //edita os campos
        cy.get('input[id="name"]').clear().type('Paciente Teste Editado')
        //clica no radio button de feminino
        cy.contains('Feminino').click() 
        //edita os campos de data de nascimento
        cy.get('input[id="birthDate"]').clear().type('30/05/2002')
        //edita o campo de cpf 
        cy.get('input[id="cpf"]').clear().type('12345678902')
        //edita o campo de rg
        cy.get('input[id="rg"]').clear().type('123456788')
        //edita o campo de telefone
        cy.get('input[id="phone"]').clear().type('123456788')
        //edita o campo de cep
        cy.get('input[id="cep"]').clear().type('12345679')
        //edita o campo de rua
        cy.get('input[id="street"]').clear().type('Rua Teste Editado')
        //edita o campo de bairro
        cy.get('input[id="neighborhood"]').clear().type('Bairro Teste Editado')
        //edita o campo de cidade
        cy.get('input[id="city"]').clear().type('Cidade Teste Editado')
        //edita o campo de estado
        cy.get('input[id="state"]').clear().type('Estado Teste Editado')
        //clica no botao de salvar
        cy.get('button').contains('Salvar').click()
        //verifica se o paciente foi editado
        cy.contains('Paciente Teste Editado')
    })
    it('deletar um paciente e verificar se o toast esta correto: Sucesso', () => {
        cy.login()
        //clica em pacientes
        cy.get('a[href="/patients"]').click()
        //verifica se ta na rota de /patients
        cy.url().should('include', '/patients')
        //clica no botao de deletar
        cy.get('div').contains('Paciente Teste').parent().parent().find('td').find('svg').eq(1).click()
        //confirma a exclusao
        cy.get('button').contains('Sim').click()
        //verifica se o paciente foi deletado
        cy.contains('Sucesso')
    })
    it('deletar um paciente e verificar se o nome do paciente sumiu', () => {
        cy.login()
        //clica em pacientes
        cy.get('a[href="/patients"]').click()
        //verifica se ta na rota de /patients
        cy.url().should('include', '/patients')
        //clica no botao de deletar
        cy.get('div').contains('Paciente Teste').parent().parent().find('td').find('svg').eq(1).click()
        //confirma a exclusao
        cy.get('button').contains('Sim').click()
        //verifica se o paciente foi deletado
        cy.contains('Paciente Teste').should('not.exist')
    })
})