import express from 'express'
import vendaController from '../controllers/venda.controller.js'
// definidor de rotas(roteador)
const router = express.Router()

//Configura a rota de cada função de vendas
router.get('', vendaController.getTodasVendas)
router.get('/detalhar/:idVenda', vendaController.getUmaVenda)
router.post('', vendaController.realizaVenda)
router.delete('/deletar/:idVenda', vendaController.cancelaVenda)
router.put('/:idVenda', vendaController.alterarVenda)

export default router;