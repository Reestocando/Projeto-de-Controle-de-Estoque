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

export default { getTodosFuncionarios, cadastraFuncionario, getUmFuncionario, excluiFuncionario, alterarFuncionario}