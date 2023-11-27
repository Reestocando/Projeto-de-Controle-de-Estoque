import estoquePersistence from "../persistences/estoque.persistence.js"

// Função para pegar uma lista com todos funcionários
async function  getTodosProdutos(){
    //regra de negócio
    //chamar camada de persistencia
    return await estoquePersistence.getTodosProdutos()
}

//Função para cadastrar um funcionário
async function  cadastraProduto(codBarras, nomeProd, qtdEstoque, custo, preco, fornecedor){
    //chamar camada de persistencia
    var resultado = await estoquePersistence.cadastraProduto(codBarras, nomeProd, qtdEstoque, custo, preco, fornecedor);

    return resultado
}

// Função de alterar um funcionário(cpf não pode ser alterado)
async function alterarProduto(codBarras, nomeProd, custo, preco, fornecedor){
    //chamar camada de persistencia
    var resultado = await estoquePersistence.alterarProduto(codBarras, nomeProd, custo, preco, fornecedor);

    return resultado
}

// Função para excluir um funcionário
async function excluiProduto(codBarras){
    //chamar camada de persistencia
    return await estoquePersistence.excluiProduto(codBarras)
}

// Função para procurar um unico funcionário por seu CPF
async function getUmProduto(codBarras){
    //chamar camada de persistencia
    return await estoquePersistence.getUmProduto(codBarras)
}

async function reporEstoque(codBarras, qtdEstoque){

    var resultado = await estoquePersistence.reporEstoque(codBarras, qtdEstoque);
    return resultado
}

export default { getTodosProdutos, getUmProduto, cadastraProduto, excluiProduto, alterarProduto, reporEstoque}