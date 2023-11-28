import estoqueServices from '../services/estoque.services.js'

async function  getTodosProdutos(req, res){
    //capturar os dados
    //validar os dados
    //chamar camada de serviços
    
    const resultado = await estoqueServices.getTodosProdutos()
    res.send(JSON.stringify(resultado))
}

async function cadastraProduto(req, res){
    const codBarras = req.body.codBarras
    const nomeProd = req.body.nomeProd
    const qtdEstoque = req.body.qtdEstoque
    const custo = req.body.custo
    const preco = req.body.preco
    const fornecedor = req.body.fornecedor

    // valida os dados
    if (estoqueServices.validarCodBarras(codBarras)) {
        if(await estoqueServices.verificarExistenciaCodBarras(codBarras)){
            res.status(400).json({mensagem: 'Este codigo de barras já está cadastrado!'})
        } else {
            if (!nomeProd || !fornecedor || qtdEstoque===null || custo===null || preco===null){
                res.status(400).json({mensagem: 'Todos os atributos (nome do produto, fornecedor, quantidade em estoque, custo e preço) são obrigatorios e não podem ser nulos!'})
            } else {
                try {
                    await estoqueServices.cadastraProduto(codBarras, nomeProd, qtdEstoque, custo, preco, fornecedor)
                    res.status(200).json({mensagem: 'Produto cadastrado com sucesso!'})
                } catch (error) {
                    console.error(error);
                    res.status(500).json({mensagem: 'Erro ao cadastrar o produto!'})
                }
            }
        }
    } else {
        res.status(400).json({mensagem: 'Codigo de barras invalido! Por favor insira um codigo de barras com 13 digitos numericos'})
    }
}

async function getUmProduto(req, res){
    //captura o dado
    const codBarras = req.params.codBarras

    //valida o dado
    if(estoqueServices.validarCodBarras(codBarras)) {
        try {
            const resultado = await estoqueServices.getUmProduto(codBarras)
            res.send(resultado)
        } catch (error) {
            res.status(500).json({mensagem: 'Este produto nao foi encontrado!'})
        }
    } else {
        res.status(400).json({mensagem: 'Codigo de barras invalido! Por favor insira um codigo de barras com 13 digitos numericos'})
    }
}

async function excluiProduto(req, res){
    const codBarras = req.params.codBarras

    //valida o dado
    if(estoqueServices.validarCodBarras(codBarras)) {
        try {
            await estoqueServices.excluiProduto(codBarras)
            res.status(200).json({mensagem: 'Produto removido com sucesso!'})
        } catch (error) {
            res.status(500).json({mensagem: 'Este produto nao foi encontrado!'})
        }
    } else {
        res.status(400).json({mensagem: 'Codigo de barras invalido! Por favor insira um codigo de barras com 13 digitos numericos'})
    }    
}

// criar uma verificação para escolher qual campo alterar (desde q não seja CPF)
async function alterarProduto(req, res){
    const codBarras = req.params.codBarras
    const nomeProd = req.body.nomeProd
    const custo = req.body.custo
    const preco = req.body.preco
    const fornecedor = req.body.fornecedor

    if (estoqueServices.validarCodBarras(codBarras)) {
        if (!nomeProd || !fornecedor || custo===null || preco===null){
            res.status(400).json({mensagem: 'Todos os atributos (nome do produto, fornecedor, quantidade em estoque, custo e preço) são obrigatorios e não podem ser nulos!'})
        } else {
            try {
                await estoqueServices.alterarProduto(codBarras, nomeProd, custo, preco, fornecedor)
                res.status(200).json({mensagem: 'Produto alterado com sucesso!'})
            } catch (error) {
                console.error(error);
                res.status(500).json({mensagem: 'Erro ao alterar o produto!'})
            }
        }
    } else {
        res.status(400).json({mensagem: 'Codigo de barras invalido! Por favor insira um codigo de barras com 13 digitos numericos'})
    }
}

async function reporEstoque(req, res){
    const codBarras = req.params.codBarras
    const qtdEstoque = req.body.qtdEstoque

    if (estoqueServices.validarCodBarras(codBarras)) {
        if (qtdEstoque===null){
            res.status(400).json({mensagem: 'A quantidade em estoque é obrigatoria e não podem ser nula!'})
        } else {
            try {
                await estoqueServices.reporEstoque(codBarras, qtdEstoque)
                res.status(200).json({mensagem: 'Reposição de estoque realizada com sucesso!'})
            } catch (error) {
                console.error(error);
                res.status(500).json({mensagem: 'Erro ao repor o produto!'})
            }
        }
    } else {
        res.status(400).json({mensagem: 'Codigo de barras invalido! Por favor insira um codigo de barras com 13 digitos numericos'})
    }
}

function codBarrasValido(codBarras){
    const numeroDeCaracteresEsperados = 13;

    const codigoLimpo = codBarras.trim();

    return codigoLimpo.length === numeroDeCaracteresEsperados && !isNaN(codigoLimpo);
}

export default { getTodosProdutos, getUmProduto, cadastraProduto, excluiProduto, alterarProduto, reporEstoque}