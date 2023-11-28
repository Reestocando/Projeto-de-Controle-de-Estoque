import vendaServices from '../services/venda.services.js'
import funcionarioServices from '../services/funcionario.services.js'
import estoqueServices from '../services/estoque.services.js'

async function  getTodasVendas(req, res){
    //capturar os dados
    //validar os dados
    //chamar camada de serviços
    
    const resultado = await vendaServices.getTodasVendas()
    res.send(JSON.stringify(resultado))
}

async function realizaVenda(req, res){

    const cpfVendedor = req.body.cpfVendedor
    const nomeCliente = req.body.nomeCliente
    const codProduto = req.body.codProduto
    const formaPagto = req.body.formaPagto
    const dataVenda = req.body.dataVenda

    //Validação de cpf
    if(funcionarioServices.validarCPF(cpfVendedor)){
        //Validação de cpf existente na tabela funcionario
        if(await funcionarioServices.verificarExistenciaCPF(cpfVendedor)){
            //Validação de cod de barras
            if(estoqueServices.validarCodBarras(codProduto)){
                //Validação de cod de barras existente na tabela estoque
                if(await estoqueServices.verificarExistenciaCodBarras(codProduto)){
                    //Validação de valores nulos
                    if(!nomeCliente || !formaPagto || !funcionarioServices.validarData(dataVenda)){
                        res.status(400).json({mensagem: 'Todos os atributos são obrigatorios e não podem ser nulos!'})
                    } 
                    //Validação de valores nulos
                    else {
                        try {
                            await vendaServices.realizaVenda(cpfVendedor, nomeCliente, codProduto, formaPagto, dataVenda)
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

async function getUmaVenda(req, res){
    //captura o dado
    const idVenda = Number(req.params.idVenda)

    //valida o dado
    if (validarIdVenda(idVenda)){
        try {
            const resultado = await vendaServices.getUmaVenda(idVenda)
            res.send(resultado)
        } catch (error) {
            console.error(error);
            res.status(500).json({mensagem: 'Erro ao buscar venda!'})
        }
    } else {
        res.status(400).json({mensagem: 'ID de venda inválido. Verifique o id e digite novamente!'})
    }
}

async function cancelaVenda(req, res){
    const idVenda = Number(req.params.idVenda)

    //valida o dado
    if (validarIdVenda(idVenda)){
        try {
            await vendaServices.cancelaVenda(idVenda)
            res.status(200).json({mensagem: 'Venda cancelada com sucesso!'})
        } catch (error) {
            console.error(error);
            res.status(500).json({mensagem: 'Erro ao cancelar venda!'})
        }
    } else {
        res.status(400).json({mensagem: 'ID de venda inválido. Verifique o id e digite novamente!'})
    }
}

// criar uma verificação para escolher qual campo alterar (desde q não seja CPF)
async function alterarVenda(req, res){
    const idVenda = Number(req.params.idVenda)
    const nomeCliente = req.body.nomeCliente
    const formaPagto = req.body.formaPagto

    //valida o dado
    if (validarIdVenda(idVenda)){
        if(!nomeCliente || !formaPagto){
            res.status(400).json({mensagem: 'Todos os atributos são obrigatorios e não podem ser nulos!'})
        } else {
            try {
                await vendaServices.alterarVenda(idVenda, nomeCliente, formaPagto)
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

function validarIdVenda(idVenda) {

    let isValido = !(idVenda === null || typeof idVenda !== 'number' || idVenda < 1 || idVenda > 9999999999);
    return isValido;
}

export default { getTodasVendas, getUmaVenda, realizaVenda, cancelaVenda, alterarVenda}