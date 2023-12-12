import express from 'express'
import estoqueController from '../controllers/estoque.controller.js'
// definidor de rotas(roteador)
const router = express.Router()

//Configura a rota de cada função do estoque
router.get('', estoqueController.getTodosProdutos )
router.get('/:codBarras', estoqueController.getUmProduto)
router.post('', estoqueController.cadastraProduto )
router.delete('/:codBarras', estoqueController.excluiProduto)
router.put('/:codBarras', estoqueController.alterarProduto)
router.put('/repor/:codBarras', estoqueController.reporEstoque)

export default router;