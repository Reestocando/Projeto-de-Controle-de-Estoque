import express from 'express'
import estoqueController from '../controllers/estoque.controller.js'
// definidor de rotas(roteador)
const router = express.Router()

//para pegar um produto no banco de dados por exemplo, utilize o /:variavel
router.get('', estoqueController.getTodosProdutos )
router.get('/:cpf', estoqueController.getUmProduto)
router.post('', estoqueController.cadastraProduto )
router.delete('/:cpf', estoqueController.excluiProduto)
router.put('/:cpf', estoqueController.alterarProduto)

export default router;