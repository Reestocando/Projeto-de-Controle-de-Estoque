import estoqueServices from '../services/estoque.services.js'

// Captura e valida os dados, e chama o service relacionado a listagem de todos os produtos
async function  getTodosProdutos(req, res){
    const resultado = await estoqueServices.getTodosProdutos()
    res.send(JSON.stringify(resultado))
}

// Captura e valida os dados, e chama o service relacionado a cadastrar um produto
async function cadastraProduto(req, res){
    const codBarras = req.body.codbarras
    const nomeProd = req.body.nomeprod
    const qtdEstoque = req.body.qtdestoque
    const custo = req.body.custo
    const preco = req.body.preco
    const fornecedor = req.body.fornecedor

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

// Captura e valida os dados, e chama o service relacionado a listagem de um produto por seu codigo de barras
async function getUmProduto(req, res){
    const codBarras = req.params.codbarras

    if(estoqueServices.validarCodBarras(codBarras)) {
        if(await estoqueServices.verificarExistenciaCodBarras(codBarras)) {
            try {
                const resultado = await estoqueServices.getUmProduto(codBarras)
                res.send(resultado)
            } catch (error) {
                res.status(500).json({mensagem: 'Erro ao procurar produto!'})
            }
        } else {
            res.status(400).json({mensagem: 'Produto não encontrado!'})
        }
    } else {
        res.status(400).json({mensagem: 'Codigo de barras invalido! Por favor insira um codigo de barras com 13 digitos numericos'})
    }
}

// Captura e valida os dados, e chama o service relacionado a exclusão de um produto por seu codigo de barras
async function excluiProduto(req, res){
    const codBarras = req.params.codbarras

    if(estoqueServices.validarCodBarras(codBarras)) {
        if(await estoqueServices.verificarExistenciaCodBarras(codBarras)) {
            try {
                await estoqueServices.excluiProduto(codBarras)
                res.status(200).json({mensagem: 'Produto removido com sucesso!'})
            } catch (error) {
                res.status(500).json({mensagem: 'Erro ao excluir o produto!'})
            }
        } else {
            res.status(400).json({mensagem: 'Produto não encontrado!'})
        }
    } else {
        res.status(400).json({mensagem: 'Codigo de barras invalido! Por favor insira um codigo de barras com 13 digitos numericos'})
    }    
}

// Captura e valida os dados, e chama o service relacionado a alterar um produto por seu codigo de barras
async function alterarProduto(req, res){
    const codBarras = req.params.codbarras
    const nomeProd = req.body.nomeprod
    const custo = req.body.custo
    const preco = req.body.preco
    const fornecedor = req.body.fornecedor

    if (estoqueServices.validarCodBarras(codBarras)) {
        if(await estoqueServices.verificarExistenciaCodBarras(codBarras)) {
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
            res.status(400).json({mensagem: 'Produto não encontrado!'})
        }
    } else {
        res.status(400).json({mensagem: 'Codigo de barras invalido! Por favor insira um codigo de barras com 13 digitos numericos'})
    }
}

// Captura e valida os dados, e chama o service relacionado a reposição de um produto por seu codigo de barras no estoque
async function reporEstoque(req, res){
    const codBarras = req.params.codbarras
    const qtdEstoque = req.body.qtdestoque

    if (estoqueServices.validarCodBarras(codBarras)) {
        if(await estoqueServices.verificarExistenciaCodBarras(codBarras)) {
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
            res.status(400).json({mensagem: 'Produto não encontrado!'})
        }
    } else {
        res.status(400).json({mensagem: 'Codigo de barras invalido! Por favor insira um codigo de barras com 13 digitos numericos'})
    }
}

export default { getTodosProdutos, getUmProduto, cadastraProduto, excluiProduto, alterarProduto, reporEstoque}