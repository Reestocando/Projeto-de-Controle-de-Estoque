import BD from './BD.js'

//Conecta e executa uma operação SQL relacionada a listar todos os produtos
async function getTodosProdutos(){
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("select * from estoque");
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

//Conecta e executa uma operação SQL relacionada a cadastrar um produto
async function cadastraProduto(codbarras, nomeprod, qtdestoque, custo, preco, fornecedor){

    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("insert into estoque (codbarras, nomeprod, qtdestoque, custo, preco, fornecedor) values ($1, $2, $3, $4, $5, $6) returning *", [codbarras, nomeprod, qtdestoque, custo, preco, fornecedor]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

//Conecta e executa uma operação SQL relacionada a alterar um produto
async function alterarProduto(codbarras, nomeprod, custo, preco, fornecedor){

    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("update estoque set nomeprod=$1, custo=$2, preco=$3, fornecedor=$4 where codbarras=$5 returning *", [nomeprod, custo, preco, fornecedor, codbarras]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

//Conecta e executa uma operação SQL relacionada a listar um produto
async function getUmProduto(codbarras){
    //conectar no BD
    //executar operação SQL
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("select * from estoque where codbarras=$1", [codbarras]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

//Conecta e executa uma operação SQL relacionada a excluir um produto
async function excluiProduto(codbarras){
    //conectar no BD
    //executar operação SQL
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("delete from estoque where codbarras=$1 returning *", [codbarras]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

//Conecta e executa uma operação SQL relacionada a repor um produto no estoque
async function reporEstoque(codbarras, qtdestoque){

    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("update estoque set qtdestoque= qtdestoque + $1 where codbarras=$2 returning *", [qtdestoque, codbarras]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

//Conecta e executa uma operação SQL relacionada a fazer uma contagem de quantos produtos existem com determinado codigo de barras
async function verificarExistenciaCodBarras(codbarras){
    const conn = await BD.conectar();
    try {
        const query = await conn.query('SELECT COUNT(*) AS count FROM estoque WHERE codbarras = $1', [codbarras]);
        const quantidade = query.rows.length > 0 ? query.rows[0].count : 0;
        return quantidade > 0;
    } finally {
        conn.release();
    }
}

export default { getTodosProdutos, getUmProduto, cadastraProduto, excluiProduto, alterarProduto, reporEstoque, verificarExistenciaCodBarras}