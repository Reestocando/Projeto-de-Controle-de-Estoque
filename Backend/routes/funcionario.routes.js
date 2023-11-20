import express from 'express'
import funcionarioController from '../controllers/funcionario.controller.js'
// definidor de rotas(roteador)
const router = express.Router()

//para pegar um funcionario no banco de dados por exemplo, utilize o /:variavel
router.get('', funcionarioController.getTodosFuncionarios )
router.get('/:cpf', funcionarioController.getUmFuncionario)
router.post('', funcionarioController.cadastraFuncionario )
router.delete('/:cpf', funcionarioController.excluiFuncionario)
router.put('/:cpf', funcionarioController.alterarFuncionario)

export default router;