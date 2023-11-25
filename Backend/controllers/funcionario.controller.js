import funcionarioServices from '../services/funcionario.services.js'

async function  getTodosFuncionarios(req, res){
    //capturar os dados
    //validar os dados
    //chamar camada de serviços
    
    const resultado = await funcionarioServices.getTodosFuncionarios()
    res.send(JSON.stringify(resultado))
}

async function cadastraFuncionario(req, res){
    const cpf = req.body.cpf
    const nome = req.body.nome
    const cargo = req.body.cargo
    const salario = req.body.salario
    const endereco = req.body.endereco
    const admissao = req.body.admissao

    const resultado = await funcionarioServices.cadastraFuncionario(cpf, nome, cargo, salario, endereco, admissao)

    res.send(resultado)
}

async function getUmFuncionario(req, res){
    //captura o dado
    const cpf = req.params.cpf

    //valida o dado
    if (cpfValido(cpf)){
        //chamar camada de serviços
        const resultado = await funcionarioServices.getUmFuncionario(cpf)
        res.send(resultado)
    }
    
}

async function excluiFuncionario(req, res){
    const cpf = req.params.cpf

    if (cpfValido(cpf)){
        //chamar camada de serviços
        const resultado = await funcionarioServices.excluiFuncionario(cpf)
        res.send(resultado)
    }
    
}

// criar uma verificação para escolher qual campo alterar (desde q não seja CPF)
async function alterarFuncionario(req, res){
    const cpf = req.params.cpf
    const nome = req.body.nome
    const cargo = req.body.cargo
    const salario = req.body.salario
    const endereco = req.body.endereco
    const admissao = req.body.admissao

    const resultado = await funcionarioServices.alterarFuncionario(cpf, nome, cargo, salario, endereco, admissao)

    res.send(resultado)
}

function codBarrasValido(cpf){
    const numeroDeCaracteresEsperados = 11;

    const cpfLimpo = cpf.trim();

    return cpfLimpo.length === numeroDeCaracteresEsperados && !isNaN(cpfLimpo);
}

export default { getTodosFuncionarios, cadastraFuncionario, getUmFuncionario, excluiFuncionario, alterarFuncionario}