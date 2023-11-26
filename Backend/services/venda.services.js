import vendaPersistence from "../persistences/venda.persistence.js"

// Função para pegar uma lista com todos funcionários
async function  getTodasVendas(){
    //regra de negócio
    //chamar camada de persistencia
    return await vendaPersistence.getTodasVendas()
}

//Função para cadastrar um funcionário
async function  realizaVenda(idVenda, cpfVendedor, nomeCliente, codProduto, formaPagto, dataAtual, horaAtual){
    //chamar camada de persistencia
    var resultado = await vendaPersistence.realizaVenda(idVenda, cpfVendedor, nomeCliente, codProduto, formaPagto, dataAtual, horaAtual);

    return resultado
}

// Função de alterar um funcionário(cpf não pode ser alterado)
async function alterarVenda(idVenda, nomeCliente, formaPagto){
    //chamar camada de persistencia
    var resultado = await vendaPersistence.alterarVenda(idVenda, nomeCliente, formaPagto);

    return resultado
}

// Função para excluir um funcionário
async function cancelaVenda(idVenda){
    //chamar camada de persistencia
    return await vendaPersistence.cancelaVenda(idVenda)
}

// Função para procurar um unico funcionário por seu CPF
async function getUmaVenda(idVenda){
    //chamar camada de persistencia
    return await vendaPersistence.getUmaVenda(idVenda)
}

export default { getTodasVendas, getUmaVenda, realizaVenda, cancelaVenda, alterarVenda}