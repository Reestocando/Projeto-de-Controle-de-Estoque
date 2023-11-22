import estoqueServices from '../services/estoque.services.js'

async function  getTodosProdutos(req, res){
    //capturar os dados
    //validar os dados
    //chamar camada de serviços
    
    const resultado = await estoqueServices.getTodosProdutos()
    res.send(JSON.stringify(resultado))
}

async function cadastraProduto(req, res){
    const cpf = req.body.cpf
    const nome = req.body.nome
    const cargo = req.body.cargo
    const salario = req.body.salario
    const endereco = req.body.endereco
    const admissao = req.body.admissao

    const resultado = await estoqueServices.cadastraProduto(cpf, nome, cargo, salario, endereco, admissao)

    res.send(resultado)
}

async function getUmProduto(req, res){
    //captura o dado
    const cpf = req.params.cpf

    //valida o dado
    if (cpfValido(cpf)){
        //chamar camada de serviços
        const resultado = await estoqueServices.getUmProduto(cpf)
        res.send(resultado)
    }
    
}

async function excluiProduto(req, res){
    const cpf = req.params.cpf

    if (cpfValido(cpf)){
        //chamar camada de serviços
        const resultado = await estoqueServices.excluiProduto(cpf)
        res.send(resultado)
    }
    
}

// criar uma verificação para escolher qual campo alterar (desde q não seja CPF)
async function alterarProduto(req, res){
    const cpf = req.params.cpf
    const nome = req.body.nome
    const cargo = req.body.cargo
    const salario = req.body.salario
    const endereco = req.body.endereco
    const admissao = req.body.admissao

    const resultado = await estoqueServices.alterarProduto(cpf, nome, cargo, salario, endereco, admissao)

    res.send(resultado)
}

function codBarrasValido(cpf){
    return true
}

export default { getTodosProdutos, getUmProduto, cadastraProduto, excluiProduto, alterarProduto}