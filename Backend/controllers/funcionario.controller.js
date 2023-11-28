import funcionarioServices from '../services/funcionario.services.js'

async function  getTodosFuncionarios(req, res){

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

    // valida os dados
    if (funcionarioServices.validarCPF(cpf)) {
        if(await funcionarioServices.verificarExistenciaCPF(cpf)){
            res.status(400).json({mensagem: 'Este cpf já está cadastrado!'})
        } else {
            if (!nome || !cargo || !endereco || !funcionarioServices.validarData(admissao) || salario === null){
                res.status(400).json({mensagem: 'Todos os atributos (nome, cargo, endereco, data de admissao e salario) são obrigatorios e não podem ser nulos!'})
            } else {
                try {
                    await funcionarioServices.cadastraFuncionario(cpf, nome, cargo, salario, endereco, admissao)

                    res.status(200).json({mensagem: 'Funcionario cadastrado com sucesso!'})
                } catch (error) {
                    console.error(error);
                    res.status(500).json({mensagem: 'Erro ao cadastrar o funcionario!'})
                }
            }
        }
    } else {
        res.status(400).json({mensagem: 'CPF invalido! Por favor insira um CPF com 11 digitos numericos'})
    }
}

async function getUmFuncionario(req, res){
    //captura o dado
    const cpf = req.params.cpf

    // valida os dados
    if (funcionarioServices.validarCPF(cpf)) {
        try {
            const resultado = await funcionarioServices.getUmFuncionario(cpf)
            res.send(resultado)
        } catch (error) {
            console.error(error);
            res.status(500).json({mensagem: 'Este funcionario nao foi encontrado!'})
        }
    } else {
        res.status(400).json({mensagem: 'CPF invalido! Por favor insira um CPF com 11 digitos numericos'})
    }

}

async function excluiFuncionario(req, res){
    const cpf = req.params.cpf

    // valida os dados
    if (funcionarioServices.validarCPF(cpf)) {
        try {
            await funcionarioServices.excluiFuncionario(cpf)
            res.status(200).json({mensagem: 'Funcionario removido com sucesso!'})
        } catch (error) {
            console.error(error);
            res.status(500).json({mensagem: 'Erro ao remover o funcionario!'})
        }
    } else {
        res.status(400).json({mensagem: 'CPF invalido! Por favor insira um CPF com 11 digitos numericos'})
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

    // valida os dados
    if (funcionarioServices.validarCPF(cpf)) {
        if (!nome || !cargo || !endereco || !funcionarioServices.validarData(admissao) || salario === null){
            throw new Error('Todos os atributos (nome, cargo, endereco, data de admissao e salario) são obrigatorios e não podem ser nulos!')
        } else {
            try {
                await funcionarioServices.alterarFuncionario(cpf, nome, cargo, salario, endereco, admissao)
                res.status(200).json({mensagem: 'Funcionario alterado com sucesso!'})
            } catch (error) {
                console.error(error);
                res.status(500).json({mensagem: 'Erro ao alterar os dados deste funcionario!'})
            }
        }
    } else {
        res.status(400).json({mensagem: 'CPF invalido! Por favor insira um CPF com 11 digitos numericos'})
    }

}

export default { getTodosFuncionarios, cadastraFuncionario, getUmFuncionario, excluiFuncionario, alterarFuncionario}