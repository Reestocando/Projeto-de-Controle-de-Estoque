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
async function cadastraProduto(codBarras, nomeProd, qtdEstoque, custo, preco, fornecedor){

    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("insert into estoque (codBarras, nomeProd, qtdEstoque, custo, preco, fornecedor) values ($1, $2, $3, $4, $5, $6) returning *", [codBarras, nomeProd, qtdEstoque, custo, preco, fornecedor]);
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
async function alterarProduto(codBarras, nomeProd, custo, preco, fornecedor){

    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("update estoque set nomeProd=$1, custo=$2, preco=$3, fornecedor=$4 where codBarras=$5 returning *", [nomeProd, custo, preco, fornecedor, codBarras]);
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
async function getUmProduto(codBarras){
    //conectar no BD
    //executar operação SQL
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("select * from estoque where codBarras=$1", [codBarras]);
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
async function excluiProduto(codBarras){
    //conectar no BD
    //executar operação SQL
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("delete from estoque where codBarras=$1 returning *", [codBarras]);
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
async function reporEstoque(codBarras, qtdEstoque){

    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("update estoque set qtdEstoque= qtdEstoque + $1 where codBarras=$2 returning *", [qtdEstoque, codBarras]);
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
async function verificarExistenciaCodBarras(codBarras){
    const conn = await BD.conectar();
    try {
        const query = await conn.query('SELECT COUNT(*) AS count FROM estoque WHERE codBarras = $1', [codBarras]);
        const quantidade = query.rows.length > 0 ? query.rows[0].count : 0;
        return quantidade > 0;
    } finally {
        conn.release();
    }
}

export default { getTodosProdutos, getUmProduto, cadastraProduto, excluiProduto, alterarProduto, reporEstoque, verificarExistenciaCodBarras}