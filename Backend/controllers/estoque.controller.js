import estoqueServices from '../services/estoque.services.js'

async function  getTodosProdutos(req, res){
    //capturar os dados
    //validar os dados
    //chamar camada de serviços
    
    const resultado = await estoqueServices.getTodosProdutos()
    res.send(JSON.stringify(resultado))
}

async function cadastraProduto(req, res){
    const codBarras = req.body.cpf
    const nomeProd = req.body.nome
    const qtdEstoque = req.body.cargo
    const custo = req.body.salario
    const preco = req.body.endereco
    const fornecedor = req.body.admissao

    const resultado = await estoqueServices.cadastraProduto(codBarras, nomeProd, qtdEstoque, custo, preco, fornecedor)

    res.send(resultado)
}

async function getUmProduto(req, res){
    //captura o dado
    const codBarras = req.params.codBarras

    //valida o dado
    if (codBarrasValido(codBarras)){
        //chamar camada de serviços
        const resultado = await estoqueServices.getUmProduto(codBarras)
        res.send(resultado)
    }
    
}

async function excluiProduto(req, res){
    const codBarras = req.params.codBarras

    if (codBarrasValido(codBarras)){
        //chamar camada de serviços
        const resultado = await estoqueServices.excluiProduto(codBarras)
        res.send(resultado)
    }
    
}

// criar uma verificação para escolher qual campo alterar (desde q não seja CPF)
async function alterarProduto(req, res){
    const codBarras = req.params.codBarras
    const nomeProd = req.body.nomeProd
    const qtdEstoque = req.body.qtdEstoque
    const custo = req.body.custo
    const preco = req.body.preco
    const fornecedor = req.body.fornecedor

    const resultado = await estoqueServices.alterarProduto(codBarras, nomeProd, qtdEstoque, custo, preco, fornecedor)

    res.send(resultado)
}

async function reporEstoque(req, res){
    const codBarras = req.params.codBarras
    const qtdEstoque = req.body.qtdEstoque

    const resultado = await estoqueServices.reporEstoque(codBarras, qtdEstoque)

    res.send(resultado)
}

function codBarrasValido(codBarras){
    const numeroDeCaracteresEsperados = 13;

    const codigoLimpo = codBarras.trim();

    return codigoLimpo.length === numeroDeCaracteresEsperados && !isNaN(codigoLimpo);
}

export default { getTodosProdutos, getUmProduto, cadastraProduto, excluiProduto, alterarProduto, reporEstoque}