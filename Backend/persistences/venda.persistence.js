import BD from './BD.js'

//Conecta e executa uma operação SQL relacionada a listar todas as vendas
async function getTodasVendas(){
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("SELECT v.idVenda, v.cpfVendedor, v.nomeCliente, v.codProduto, v.formaPagto, v.dataVenda, f.nome AS nomeVendedor, e.nomeProd AS nomeProduto FROM venda v JOIN funcionario f ON v.cpfVendedor = f.cpf JOIN estoque e ON v.codProduto = e.codBarras");
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }
    return resultado
}

//Conecta e executa uma operação SQL relacionada a cadastrar uma venda
async function realizaVenda(cpfVendedor, nomeCliente, codProduto, formaPagto, dataVenda){
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("insert into venda (cpfVendedor, nomeCliente, codProduto, formaPagto, dataVenda) values ($1, $2, $3, $4, $5) returning *", [cpfVendedor, nomeCliente, codProduto,formaPagto, dataVenda]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }
    return resultado
}

//Conecta e executa uma operação SQL relacionada a alterar uma venda
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

//Conecta e executa uma operação SQL relacionada a listar uma venda
async function getUmaVenda(idVenda){
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("SELECT v.idVenda, v.cpfVendedor, v.nomeCliente, v.codProduto, v.formaPagto, v.dataVenda, f.nome AS nomeVendedor, e.nomeProd AS nomeProduto FROM venda v JOIN funcionario f ON v.cpfVendedor = f.cpf JOIN estoque e ON v.codProduto = e.codBarras where idVenda=$1", [idVenda]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }
    return resultado
}

//Conecta e executa uma operação SQL relacionada a cancelar uma venda
async function cancelaVenda(idVenda){
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

export default { getTodasVendas, getUmaVenda, realizaVenda, cancelaVenda, alterarVenda}