// listarProdutos.test.js
const produtos = require('./estoque.persistence');

test('Listar produtos do banco de dados', async () => {


    const resultado = await produtos.getTodosProdutos();
    
    expect(resultado).toEqual([
        { codigoDeBarras: '123', nome: 'Produto 1', quantidadeEmEstoque: 10, custo: 5.99, preco: 9.99, fornecedor: 'Fornecedor A' },
        { codigoDeBarras: '456', nome: 'Produto 2', quantidadeEmEstoque: 15, custo: 8.99, preco: 14.99, fornecedor: 'Fornecedor B' }
    ]);
});
