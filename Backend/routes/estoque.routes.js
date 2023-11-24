import express from 'express'
import estoqueController from '../controllers/estoque.controller.js'
// definidor de rotas(roteador)
const router = express.Router()

//para pegar um produto no banco de dados por exemplo, utilize o /:variavel
router.get('', estoqueController.getTodosProdutos )
router.get('/:codBarras', estoqueController.getUmProduto)
router.post('', estoqueController.cadastraProduto )
router.delete('/:codBarras', estoqueController.excluiProduto)
router.put('/:codBarras', estoqueController.alterarProduto)
router.put('/:codBarras', estoqueController.reporEstoque)

export default router;