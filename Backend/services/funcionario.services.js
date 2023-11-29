import funcionarioPersistence from "../persistences/funcionario.persistence.js"

// Regra de negocio e chamada da persistencia relacionada a listagem de todos os funcionarios
async function  getTodosFuncionarios(){
    return await funcionarioPersistence.getTodosFuncionarios()
}

// Regra de negocio e chamada da persistencia relacionada ao cadastro de um funcionario
async function  cadastraFuncionario(cpf, nome, cargo, salario, endereco, admissao){
    var resultado = await funcionarioPersistence.cadastraFuncionario(cpf, nome, cargo, salario, endereco, admissao);
    return resultado
}

// Regra de negocio e chamada da persistencia relacionada a alterar um funcionaro pelo seu cpf
async function alterarFuncionario(cpf, nome, cargo, salario, endereco, admissao){
    var resultado = await funcionarioPersistence.alterarFuncionario(cpf, nome, cargo, salario, endereco, admissao);
    return resultado
}

// Regra de negocio e chamada da persistencia relacionada a excluir um funcionaro pelo seu cpf
async function excluiFuncionario(cpf){
    return await funcionarioPersistence.excluiFuncionario(cpf)
}

// Regra de negocio e chamada da persistencia relacionada a listar um funcionaro pelo seu cpf
async function getUmFuncionario(cpf){
    return await funcionarioPersistence.getUmFuncionario(cpf)
}

// Regra de negocio e chamada de persistencia para verificar se já existe um CPF cadastrado
async function verificarExistenciaCPF(cpf){
    const existeFuncionario = await funcionarioPersistence.verificarExistenciaCPF(cpf);
    return existeFuncionario;
}

// Regra de negocio sobre como um cpf deve ser formatado
function validarCPF(cpf){
    const regex = /^\d{11}$/;
    return regex.test(cpf);
}

// Regra de negocio sobre como uma data deve ser formatada
function validarData(admissao){
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(admissao);
}

export default { getTodosFuncionarios, cadastraFuncionario, getUmFuncionario, excluiFuncionario, alterarFuncionario, validarCPF, validarData, verificarExistenciaCPF}