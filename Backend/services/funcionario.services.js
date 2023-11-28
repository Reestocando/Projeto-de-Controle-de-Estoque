import funcionarioPersistence from "../persistences/funcionario.persistence.js"

// Função para pegar uma lista com todos funcionários
async function  getTodosFuncionarios(){
    //regra de negócio
    //chamar camada de persistencia
    return await funcionarioPersistence.getTodosFuncionarios()
}

//Função para cadastrar um funcionário
async function  cadastraFuncionario(cpf, nome, cargo, salario, endereco, admissao){
    //chamar camada de persistencia
    var resultado = await funcionarioPersistence.cadastraFuncionario(cpf, nome, cargo, salario, endereco, admissao);

    return resultado
}

// Função de alterar um funcionário(cpf não pode ser alterado)
async function alterarFuncionario(cpf, nome, cargo, salario, endereco, admissao){
    //chamar camada de persistencia
    var resultado = await funcionarioPersistence.alterarFuncionario(cpf, nome, cargo, salario, endereco, admissao);

    return resultado
}

// Função para excluir um funcionário
async function excluiFuncionario(cpf){
    //chamar camada de persistencia
    return await funcionarioPersistence.excluiFuncionario(cpf)
}

// Função para procurar um unico funcionário por seu CPF
async function getUmFuncionario(cpf){
    //chamar camada de persistencia
    return await funcionarioPersistence.getUmFuncionario(cpf)
}

async function verificarExistenciaCPF(cpf){
    const existeFuncionario = await funcionarioPersistence.verificarExistenciaCPF(cpf);
    return existeFuncionario;
}

function validarCPF(cpf){
    const regex = /^\d{11}$/;
    return regex.test(cpf);
}

function validarData(admissao){
    // Verificar se a data é uma string não vazia e é uma data válida
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(admissao);
}

export default { getTodosFuncionarios, cadastraFuncionario, getUmFuncionario, excluiFuncionario, alterarFuncionario, validarCPF, validarData, verificarExistenciaCPF}