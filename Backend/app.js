import express from'express'
import bodyParser from 'body-parser'
import funcionarioRouter from './routes/funcionario.routes.js'
import estoqueRouter from './routes/estoque.routes.js'
import vendaRouter from './routes/venda.routes.js'
import cors from 'cors'

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // ou especifique a origem do seu aplicativo
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cors());

// converte o objeto request no formato JSON
app.use(express.json());

// faz o Parser dos pacotes recebidos
app.use(bodyParser.urlencoded({extended:true}))

// configura o nome da pasta onde os arquivos estáticos estarão
app.use(express.static('view'))

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