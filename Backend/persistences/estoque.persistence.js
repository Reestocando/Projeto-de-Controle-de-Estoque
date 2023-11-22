import BD from './BD.js'

async function getTodosProdutos(){
    //conectar no BD
    //executar operação SQL
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

async function cadastraProduto(cpf, nome, cargo, salario, endereco, admissao){

    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("insert into estoque (cpf, nome, cargo, salario, endereco, admissao) values ($1, $2, $3, $4, $5, $6) returning *", [cpf, nome, cargo, salario, endereco, admissao]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

async function alterarProduto(cpf, nome, cargo, salario, endereco, admissao){

    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("update estoque set nome=$1, cargo=$2, salario=$3, endereco=$4, admissao=$5 where cpf=$6 returning *", [nome, cargo, salario, endereco, admissao, cpf]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

async function getUmProduto(cpf){
    //conectar no BD
    //executar operação SQL
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("select * from estoque where cpf=$1", [cpf]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

async function excluiProduto(cpf){
    //conectar no BD
    //executar operação SQL
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("delete from estoque where cpf=$1 returning *", [cpf]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

export default { getTodosProdutos, getUmProduto, cadastraProduto, excluiProduto, alterarProduto}