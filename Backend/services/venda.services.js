import vendaPersistence from "../persistences/venda.persistence.js"

// Regra de negocio e chamada da persistencia relacionada a listagem de todas as vendas
async function  getTodasVendas(){
    return await vendaPersistence.getTodasVendas()
}

// Regra de negocio e chamada da persistencia relacionada ao cadastro de uma venda
async function  realizaVenda(cpfvendedor, nomecliente, codproduto, formapagto, datavenda){
    var resultado = await vendaPersistence.realizaVenda(cpfvendedor, nomecliente, codproduto, formapagto, datavenda);
    return resultado
}

// Regra de negocio e chamada da persistencia relacionada a alterar uma venda
async function alterarVenda(idvenda, nomecliente, formapagto){
    var resultado = await vendaPersistence.alterarVenda(idvenda, nomecliente, formapagto);

    return resultado
}

// Regra de negocio e chamada da persistencia relacionada a cancelar uma venda
async function cancelaVenda(idvenda){
    return await vendaPersistence.cancelaVenda(idvenda)
}

// Regra de negocio e chamada da persistencia relacionada a listar uma venda
async function getUmaVenda(idvenda){
    return await vendaPersistence.getUmaVenda(idvenda)
}

export default { getTodasVendas, getUmaVenda, realizaVenda, cancelaVenda, alterarVenda}