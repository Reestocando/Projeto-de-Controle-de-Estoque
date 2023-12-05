import vendaServices from '../services/venda.services.js'
import funcionarioServices from '../services/funcionario.services.js'
import estoqueServices from '../services/estoque.services.js'

// Captura e valida os dados, e chama o service relacionado a listagem de todas as vendas
async function  getTodasVendas(req, res){
    const resultado = await vendaServices.getTodasVendas()
    res.send(JSON.stringify(resultado))
}

// Captura e valida os dados, e chama o service relacionado a cadastrar uma venda
async function realizaVenda(req, res){

    const cpfvendedor = req.body.cpfvendedor
    const nomecliente = req.body.nomecliente
    const codproduto = req.body.codproduto
    const formapagto = req.body.formapagto
    const datavenda = req.body.datavenda

    //Validação de cpf
    if(funcionarioServices.validarCPF(cpfvendedor)){
        //Validação de cpf existente na tabela funcionario
        if(await funcionarioServices.verificarExistenciaCPF(cpfvendedor)){
            //Validação de cod de barras
            if(estoqueServices.validarCodBarras(codproduto)){
                //Validação de cod de barras existente na tabela estoque
                if(await estoqueServices.verificarExistenciaCodBarras(codproduto)){
                    //Validação de valores nulos
                    if(!nomecliente || !formapagto || !funcionarioServices.validarData(datavenda)){
                        res.status(400).json({mensagem: 'Todos os atributos são obrigatorios e não podem ser nulos!'})
                    } 
                    //Validação de valores nulos
                    else {
                        try {
                            await vendaServices.realizaVenda(cpfvendedor, nomecliente, codproduto, formapagto, datavenda)
                            res.status(200).json({mensagem: 'Venda Realizada com sucesso!'})
                        } catch (error) {
                            console.error(error);
                            res.status(500).json({mensagem: 'Erro ao cadastrar a venda!'})
                        }
                    }
                }
                //Validação de cod de barras existente na tabela estoque
                else {
                    res.status(400).json({mensagem: 'Este Produto não existe!'})
                }
            }
            //Validação de cod de barras
            else {
                res.status(400).json({mensagem: 'Codigo de barras invalido! Por favor insira um codigo de barras com 13 digitos numericos'})
            }
        }
        //Validação de cpf existente na tabela funcionario
        else {
            res.status(400).json({mensagem: 'Este funcionario não está cadastrado!'})
        }
    }
    //Validação de cpf
    else {
        res.status(400).json({mensagem: 'CPF invalido! Por favor insira um CPF com 11 digitos numericos'})
    }
}

// Captura e valida os dados, e chama o service relacionado a listar uma venda selecionada por seu id cadastrado no banco de dados
async function getUmaVenda(req, res){
    
    const idvenda = Number(req.params.idvenda)

    if (validaridvenda(idvenda)){
        try {
            const resultado = await vendaServices.getUmaVenda(idvenda)
            res.send(resultado)
        } catch (error) {
            console.error(error);
            res.status(500).json({mensagem: 'Erro ao buscar venda!'})
        }
    } else {
        res.status(400).json({mensagem: 'ID de venda inválido. Verifique o id e digite novamente!'})
    }
}

// Captura e valida os dados, e chama o service relacionado a cancelar uma venda selecionada por seu id cadastrado no banco de dados
async function cancelaVenda(req, res){
    const idvenda = Number(req.params.idvenda)

    if (validaridvenda(idvenda)){
        try {
            await vendaServices.cancelaVenda(idvenda)
            res.status(200).json({mensagem: 'Venda cancelada com sucesso!'})
        } catch (error) {
            console.error(error);
            res.status(500).json({mensagem: 'Erro ao cancelar venda!'})
        }
    } else {
        res.status(400).json({mensagem: 'ID de venda inválido. Verifique o id e digite novamente!'})
    }
}

// Captura e valida os dados, e chama o service relacionado a alterar uma venda selecionada por seu id cadastrado no banco de dados
async function alterarVenda(req, res){
    const idvenda = Number(req.params.idvenda)
    const nomecliente = req.body.nomecliente
    const formapagto = req.body.formapagto

    if (validaridvenda(idvenda)){
        if(!nomecliente || !formapagto){
            res.status(400).json({mensagem: 'Todos os atributos são obrigatorios e não podem ser nulos!'})
        } else {
            try {
                await vendaServices.alterarVenda(idvenda, nomecliente, formapagto)
                res.status(200).json({mensagem: 'Venda alterada com sucesso!'})
            } catch (error) {
                console.error(error);
                res.status(500).json({mensagem: 'Erro ao alterar venda!'})
            }
        }
    } else {
        res.status(400).json({mensagem: 'ID de venda inválido. Verifique o id e digite novamente!'})
    }
}

//Validação do id da venda que pode ser um numero maior que 0 e pode ter até no maximo 10 digitos
function validaridvenda(idvenda) {

    let isValido = !(idvenda === null || typeof idvenda !== 'number' || idvenda < 1 || idvenda > 9999999999);
    return isValido;
}

export default { getTodasVendas, getUmaVenda, realizaVenda, cancelaVenda, alterarVenda}