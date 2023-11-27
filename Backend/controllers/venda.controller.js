import vendaServices from '../services/venda.services.js'

async function  getTodasVendas(req, res){
    //capturar os dados
    //validar os dados
    //chamar camada de serviços
    
    const resultado = await vendaServices.getTodasVendas()
    res.send(JSON.stringify(resultado))
}

async function realizaVenda(req, res){

    const dataHoraAtual = new Date();

    // Obter componentes da data e hora
    const ano = dataHoraAtual.getFullYear();
    const mes = String(dataHoraAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataHoraAtual.getDate()).padStart(2, '0');
    const hora = String(dataHoraAtual.getHours()).padStart(2, '0');
    const minutos = String(dataHoraAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataHoraAtual.getSeconds()).padStart(2, '0');

    // Formatar a data e hora no formato desejado
    const dataHoraAtualMoment = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

    const idVenda = req.body.idVenda
    const cpfVendedor = req.body.cpfVendedor
    const nomeCliente = req.body.nomeCliente
    const codProduto = req.body.codProduto
    const formaPagto = req.body.formaPagto

    const resultado = await vendaServices.realizaVenda(idVenda, cpfVendedor, nomeCliente, codProduto, formaPagto, dataHoraAtualMoment)

    res.send(resultado)
}

async function getUmaVenda(req, res){
    //captura o dado
    const idVenda = req.params.idVenda

    //valida o dado
    if (validarIdVenda(idVenda)){
        //chamar camada de serviços
        const resultado = await vendaServices.getUmaVenda(idVenda)
        res.send(resultado)
    }
    
}

async function cancelaVenda(req, res){
    const idVenda = req.params.idVenda

    if (validarIdVenda(idVenda)){
        //chamar camada de serviços
        const resultado = await vendaServices.cancelaVenda(idVenda)
        res.send(resultado)
    }
    
}

// criar uma verificação para escolher qual campo alterar (desde q não seja CPF)
async function alterarVenda(req, res){
    const idVenda = req.params.idVenda
    const nomeCliente = req.body.nomeCliente
    const formaPagto = req.body.formaPagto


    const resultado = await vendaServices.alterarVenda(idVenda, nomeCliente, formaPagto)

    res.send(resultado)
}

function validarIdVenda(idVenda) {
    // Verifica se é um número
    const isNumero = !isNaN(idVenda) && isFinite(idVenda);
  
    // Verifica se é maior que 0 e não contém letras
    const isValido = isNumero && parseInt(idVenda, 10) > 0 && /^[0-9]+$/.test(idVenda);
  
    return isValido;
}

export default { getTodasVendas, getUmaVenda, realizaVenda, cancelaVenda, alterarVenda}