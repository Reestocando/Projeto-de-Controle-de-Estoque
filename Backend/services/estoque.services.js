import estoquePersistence from "../persistences/estoque.persistence.js"

// Função para pegar uma lista com todos funcionários
async function  getTodosProdutos(){
    //regra de negócio
    //chamar camada de persistencia
    return await estoquePersistence.getTodosProdutos()
}

//Função para cadastrar um funcionário
async function  cadastraProduto(cpf, nome, cargo, salario, endereco, admissao){
    //chamar camada de persistencia
    var resultado = await estoquePersistence.cadastraProduto(cpf, nome, cargo, salario, endereco, admissao);

    return resultado
}

// Função de alterar um funcionário(cpf não pode ser alterado)
async function alterarProduto(cpf, nome, cargo, salario, endereco, admissao){
    //chamar camada de persistencia
    var resultado = await estoquePersistence.alterarProduto(cpf, nome, cargo, salario, endereco, admissao);

    return resultado
}

// Função para excluir um funcionário
async function excluiProduto(cpf){
    //chamar camada de persistencia
    return await estoquePersistence.excluiProduto(cpf)
}

// Função para procurar um unico funcionário por seu CPF
async function getUmProduto(cpf){
    //chamar camada de persistencia
    return await estoquePersistence.getUmProduto(cpf)
}

export default { getTodosProdutos, getUmProduto, cadastraProduto, excluiProduto, alterarProduto}