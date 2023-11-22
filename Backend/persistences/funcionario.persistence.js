import BD from './BD.js'

async function getTodosFuncionarios(){
    //conectar no BD
    //executar operação SQL
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("select * from funcionario");
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

async function cadastraFuncionario(cpf, nome, cargo, salario, endereco, admissao){

    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("insert into funcionario (cpf, nome, cargo, salario, endereco, admissao) values ($1, $2, $3, $4, $5, $6) returning *", [cpf, nome, cargo, salario, endereco, admissao]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

async function alterarFuncionario(cpf, nome, cargo, salario, endereco, admissao){

    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("update funcionario set nome=$1, cargo=$2, salario=$3, endereco=$4, admissao=$5 where cpf=$6 returning *", [nome, cargo, salario, endereco, admissao, cpf]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

async function getUmFuncionario(cpf){
    //conectar no BD
    //executar operação SQL
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("select * from funcionario where cpf=$1", [cpf]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

async function excluiFuncionario(cpf){
    //conectar no BD
    //executar operação SQL
    var resultado = null;
    const conn = await BD.conectar();

    try{
        var query = await conn.query("delete from funcionario where cpf=$1 returning *", [cpf]);
        console.log(query.rows)
        resultado = query.rows
    } catch(err){
        console.log(err)
    } finally{
        conn.release()
    }

    return resultado
}

export default { getTodosFuncionarios, cadastraFuncionario, getUmFuncionario, excluiFuncionario, alterarFuncionario}