import vendaPersistence from "../persistences/venda.persistence.js"

// Regra de negocio e chamada da persistencia relacionada a listagem de todas as vendas
async function  getTodasVendas(){
    return await vendaPersistence.getTodasVendas()
}

// Regra de negocio e chamada da persistencia relacionada ao cadastro de uma venda
async function  realizaVenda(cpfVendedor, nomeCliente, codProduto, formaPagto, dataVenda){
    var resultado = await vendaPersistence.realizaVenda(cpfVendedor, nomeCliente, codProduto, formaPagto, dataVenda);
    return resultado
}

// Regra de negocio e chamada da persistencia relacionada a alterar uma venda
async function alterarVenda(idVenda, nomeCliente, formaPagto){
    var resultado = await vendaPersistence.alterarVenda(idVenda, nomeCliente, formaPagto);

    return resultado
}

// Regra de negocio e chamada da persistencia relacionada a cancelar uma venda
async function cancelaVenda(idVenda){
    return await vendaPersistence.cancelaVenda(idVenda)
}

// Regra de negocio e chamada da persistencia relacionada a listar uma venda
async function getUmaVenda(idVenda){
    return await vendaPersistence.getUmaVenda(idVenda)
}

export default { getTodasVendas, getUmaVenda, realizaVenda, cancelaVenda, alterarVenda}