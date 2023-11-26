import express from'express'
import bodyParser from 'body-parser'
import funcionarioRouter from './routes/funcionario.routes.js'
import estoqueRouter from './routes/estoque.routes.js'
import vendaRouter from './routes/venda.routes.js'

const app = express()

// converte o objeto request no formato JSON
app.use(express.json())

// configura o nome da pasta onde os arquivos estáticos estarão
app.use(express.static('view'))

// faz o Parser dos pacotes recebidos
app.use(bodyParser.urlencoded({extended:true}))

// utiliza o router da pasta funcionario
app.use("/funcionario", funcionarioRouter)

// utiliza o router da pasta estoque
app.use("/estoque", estoqueRouter)

// utiliza o router da pasta venda
app.use("/venda", vendaRouter)

app.listen(3000, mensagemServidor)

function mensagemServidor(){
    console.log("servidor está rodando!")
}