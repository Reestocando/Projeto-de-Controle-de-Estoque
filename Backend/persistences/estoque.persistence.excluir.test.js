// excluirProduto.test.js
const produtos = require('./produtos');

test('Excluir produto do banco de dados', async () => {
    const mockDatabase = {
        query: jest.fn(() => ({ affectedRows: 1 }))
    };

    jest.mock('./database', () => mockDatabase);

    const codigoDeBarrasParaExcluir = '123';
    const resultado = await produtos.excluirProduto(codigoDeBarrasParaExcluir);

    expect(resultado).toEqual({ affectedRows: 1 });
});
