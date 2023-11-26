import BD from './BD.js'

async function getTodasVendas(){
    //conectar no BD
    //executar operação SQL
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("SELECT v.idVenda, v.cpfVendedor, v.nomeCliente, v.codProduto, v.dataAtual, v.horaAtual, f.nome AS nomeVendedor, e.nome AS nomeProduto FROM vendas v JOIN funcionario f ON v.cpfVendedor = f.cpf JOIN estoque e ON v.codProduto = e.codBarras");
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

async function realizaVenda(idVenda, cpfVendedor, nomeCliente, codProduto, dataAtual, horaAtual){

    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("insert into estoque (idVenda, cpfVendedor, nomeCliente, codProduto, dataAtual, horaAtual) values ($1, $2, $3, $4, $5, $6) returning *", [idVenda, cpfVendedor, nomeCliente, codProduto, dataAtual, horaAtual]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

async function alterarVenda(idVenda, nomeCliente, formaPagto){

    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("update venda set nomeCliente=$1, formaPagto=$2 where idVenda=$3 returning *", [nomeCliente, formaPagto, idVenda]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

async function getUmaVenda(idVenda){
    //conectar no BD
    //executar operação SQL
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("SELECT v.idVenda, v.cpfVendedor, v.nomeCliente, v.codProduto, v.dataAtual, v.horaAtual, f.nome AS nomeVendedor, e.nome AS nomeProduto FROM vendas v JOIN funcionario f ON v.cpfVendedor = f.cpf JOIN estoque e ON v.codProduto = e.codBarras where idVenda=$1", [idVenda]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

async function cancelarVenda(idVenda){
    //conectar no BD
    //executar operação SQL
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("DELETE FROM venda WHERE idVenda=$1 returning *", [idVenda]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

export default { getTodasVendas, getUmaVenda, realizaVenda, cancelarVenda, alterarVenda}