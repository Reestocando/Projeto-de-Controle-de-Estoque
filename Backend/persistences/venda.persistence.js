import BD from './BD.js'

//Conecta e executa uma operação SQL relacionada a listar todas as vendas
async function getTodasVendas(){
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("SELECT v.idvenda, v.cpfVendedor, v.nomecliente, v.codProduto, v.formapagto, v.dataVenda, f.nome AS nomeVendedor, e.nomeProd AS nomeProduto FROM venda v JOIN funcionario f ON v.cpfVendedor = f.cpf JOIN estoque e ON v.codProduto = e.codBarras");
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
async function realizaVenda(cpfVendedor, nomecliente, codProduto, formapagto, dataVenda){
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("insert into venda (cpfVendedor, nomecliente, codProduto, formapagto, dataVenda) values ($1, $2, $3, $4, $5) returning *", [cpfVendedor, nomecliente, codProduto,formapagto, dataVenda]);
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
async function alterarVenda(idvenda, nomecliente, formapagto){
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("update venda set nomecliente=$1, formapagto=$2 where idvenda=$3 returning *", [nomecliente, formapagto, idvenda]);
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
async function getUmaVenda(idvenda){
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("SELECT v.idvenda, v.cpfVendedor, v.nomecliente, v.codProduto, v.formapagto, v.dataVenda, f.nome AS nomeVendedor, e.nomeProd AS nomeProduto FROM venda v JOIN funcionario f ON v.cpfVendedor = f.cpf JOIN estoque e ON v.codProduto = e.codBarras where idvenda=$1", [idvenda]);
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
async function cancelaVenda(idvenda){
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("DELETE FROM venda WHERE idvenda=$1 returning *", [idvenda]);
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