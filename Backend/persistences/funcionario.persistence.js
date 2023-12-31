import BD from './BD.js'

//Conecta e executa uma operação SQL relacionada a listar todos os funcionarios
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

//Conecta e executa uma operação SQL relacionada a cadastrar um funcionario
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

//Conecta e executa uma operação SQL relacionada a alterar um funcionario por seu cpf
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

//Conecta e executa uma operação SQL relacionada a listar um funcionario por seu cpf
async function getUmFuncionario(cpf) {
    let resultado = null;
    const conn = await BD.conectar();

    try {
        const query = await conn.query("SELECT * FROM funcionario WHERE cpf = $1 LIMIT 1", [cpf]);
        console.log(query.rows);

        // Verifica se há algum resultado antes de atribuir à variável resultado
        resultado = query.rows.length > 0 ? query.rows[0] : null;
    } catch (err) {
        console.error(err);
    } finally {
        conn.release();
    }

    return resultado;
}

//Conecta e executa uma operação SQL relacionada a excluir um funcionario por seu cpf
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

//Conecta e executa uma operação SQL relacionada a contar a quantidade de determinado cpf cadastrado
async function verificarExistenciaCPF(cpf){
    const conn = await BD.conectar();
    try {
        const query = await conn.query('SELECT COUNT(*) AS count FROM funcionario WHERE cpf = $1', [cpf]);
        const quantidade = query.rows.length > 0 ? query.rows[0].count : 0;
        return quantidade > 0;
    } finally {
        conn.release();
    }
}

export default { getTodosFuncionarios, cadastraFuncionario, getUmFuncionario, excluiFuncionario, alterarFuncionario, verificarExistenciaCPF}