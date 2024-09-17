describe('OdontoManage Stock', () => {
    beforeEach(() => {
        cy.viewport(1366, 768)
    })
    it('criar um novo produto', () => {
        cy.login()
        //clica em estoque
        cy.get('a[href="/stock"]').click()
        //verifica se ta na rota de /stock
        cy.url().should('include', '/stock')
        //clica em botao de Novo Produto\
        cy.get('button').contains('Novo Produto').click()
        //preenche os campos
        cy.get('input[id="name"]').type('Produto Teste')
        cy.get('input[id="amount"]').type('100')
        cy.get('input[id="price"]').type('10')
        //clica no botao de salvar
        cy.get('button').contains('Cadastrar').click()
        //verifica se o produto foi criado
        cy.contains('Produto Teste')
    })
    it('editar um produto', () => {
        cy.login()
        //clica em estoque
        cy.get('a[href="/stock"]').click()
        //verifica se ta na rota de /stock
        cy.url().should('include', '/stock')
        //clica no botao de editar
        cy.get('div').contains('Produto Teste').parent().parent().find('td').eq(4).find('svg').eq(0).click()
        //edita os campos
        cy.get('input[id="name"]').clear().type('Produto Teste Editado')
        cy.get('input[id="amount"]').clear().type('200')
        cy.get('input[id="price"]').clear().type('20')
        //clica no botao de salvar
        cy.get('button').contains('Salvar').click()
        //verifica se o produto foi editado
        cy.contains('Produto Teste Editado')
    })
    it('fazer retirada maior que a quantidade de produto no estoque', () => {
        cy.login()
        //clica em estoque
        cy.get('a[href="/stock"]').click()
        //verifica se ta na rota de /stock
        cy.url().should('include', '/stock')
        //clica no botao de retirar
        cy.get('div').contains('Produto Teste Editado').parent().parent().find('td').eq(3).find('svg').click()
        //edita os campos
        cy.get('input[id="quantity"]').clear().type('201')
        //clica no botao de retirar
        cy.get('button').contains('OK').click()
        //verifica se o produto foi retirado
        cy.contains('Erro!')
    })
    it('deletar um produto', () => {
        cy.login()
        //clica em estoque
        cy.get('a[href="/stock"]').click()
        //verifica se ta na rota de /stock
        cy.url().should('include', '/stock')
        //clica no botao de deletar
        cy.get('div').contains('Produto Teste Editado').parent().parent().find('td').eq(4).find('svg').eq(1).click()
        //confirma a exclusao
        cy.get('button').contains('Sim').click()
        //verifica se o produto foi deletado
        cy.contains('Produto Teste Editado').should('not.exist')
    })
})