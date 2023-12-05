import estoquePersistence from "../persistences/estoque.persistence.js"

// Regra de negocio e chamada da persistencia relacionada a listagem de todos os produtos
async function  getTodosProdutos(){
    return await estoquePersistence.getTodosProdutos()
}

// Regra de negocio e chamada da persistencia relacionada ao cadastro de um produto
async function  cadastraProduto(codBarras, nomeProd, qtdEstoque, custo, preco, fornecedor){
    var resultado = await estoquePersistence.cadastraProduto(codBarras, nomeProd, qtdEstoque, custo, preco, fornecedor);
    return resultado
}

// Regra de negocio e chamada da persistencia relacionada a alterar um produto
async function alterarProduto(codBarras, nomeProd, custo, preco, fornecedor){
    var resultado = await estoquePersistence.alterarProduto(codBarras, nomeProd, custo, preco, fornecedor);
    return resultado
}

// Regra de negocio e chamada da persistencia relacionada a excluir um produto
async function excluiProduto(codBarras){
    return await estoquePersistence.excluiProduto(codBarras)
}

// Regra de negocio e chamada da persistencia relacionada a listar um produto
async function getUmProduto(codBarras){
    //chamar camada de persistencia
    return await estoquePersistence.getUmProduto(codBarras)
}

// Regra de negocio e chamada da persistencia relacionada a repor um produto no estoque
async function reporEstoque(codBarras, qtdEstoque){

    var resultado = await estoquePersistence.reporEstoque(codBarras, qtdEstoque);
    return resultado
}

// Regra de negocio e chamada da persistencia relacionada a verificar a existencia de um produto com determinado codigo de barras
async function verificarExistenciaCodBarras(codBarras){
    const existeProduto = await estoquePersistence.verificarExistenciaCodBarras(codBarras);
    return existeProduto;
}

// Regra de negocio sobre como deve ser formatado um codigo de barras
function validarCodBarras(codBarras){
    const codigoNumerico = codBarras.replace(/\D/g, '');
    const regex = /^\d{13}$/;
    return regex.test(codigoNumerico);
}

export default { getTodosProdutos, getUmProduto, cadastraProduto, excluiProduto, alterarProduto, reporEstoque, verificarExistenciaCodBarras, validarCodBarras}