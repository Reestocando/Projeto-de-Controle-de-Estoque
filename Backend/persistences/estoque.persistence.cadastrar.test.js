// cadastrarProduto.test.js
const produtos = require('./estoque.persistence');

test('Cadastrar novo produto no banco de dados', async () => {


    const novoProduto = {codigoDeBarras: '789', nome: 'Novo Produto', quantidadeEmEstoque: 20, custo: 12.99, preco: 19.99, fornecedor: 'Fornecedor C'};

    const resultado = await produtos.cadastraProduto(novoProduto);

    expect(resultado).toBeTruthy;
});
