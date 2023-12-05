import estoquePersistence from "../persistences/estoque.persistence.js"

// Regra de negocio e chamada da persistencia relacionada a listagem de todos os produtos
async function  getTodosProdutos(){
    return await estoquePersistence.getTodosProdutos()
}

// Regra de negocio e chamada da persistencia relacionada ao cadastro de um produto
async function  cadastraProduto(codbarras, nomeprod, qtdestoque, custo, preco, fornecedor){
    var resultado = await estoquePersistence.cadastraProduto(codbarras, nomeprod, qtdestoque, custo, preco, fornecedor);
    return resultado
}

// Regra de negocio e chamada da persistencia relacionada a alterar um produto
async function alterarProduto(codbarras, nomeprod, custo, preco, fornecedor){
    var resultado = await estoquePersistence.alterarProduto(codbarras, nomeprod, custo, preco, fornecedor);
    return resultado
}

// Regra de negocio e chamada da persistencia relacionada a excluir um produto
async function excluiProduto(codbarras){
    return await estoquePersistence.excluiProduto(codbarras)
}

// Regra de negocio e chamada da persistencia relacionada a listar um produto
async function getUmProduto(codbarras){
    //chamar camada de persistencia
    return await estoquePersistence.getUmProduto(codbarras)
}

// Regra de negocio e chamada da persistencia relacionada a repor um produto no estoque
async function reporEstoque(codbarras, qtdestoque){

    var resultado = await estoquePersistence.reporEstoque(codbarras, qtdestoque);
    return resultado
}

// Regra de negocio e chamada da persistencia relacionada a verificar a existencia de um produto com determinado codigo de barras
async function verificarExistenciaCodBarras(codbarras){
    const existeProduto = await estoquePersistence.verificarExistenciaCodBarras(codbarras);
    return existeProduto;
}

// Regra de negocio sobre como deve ser formatado um codigo de barras
function validarCodBarras(codbarras){
    const regex = /^\d{13}$/;
    return regex.test(codbarras);
}

export default { getTodosProdutos, getUmProduto, cadastraProduto, excluiProduto, alterarProduto, reporEstoque, verificarExistenciaCodBarras, validarCodBarras}