//config inicia
// chamar os pacotes
// require faz busca de um arquivo dentro da pasta node_modules
require('dotenv').config()
const express = require('express')
const res = require('express/lib/response')
const mongoose = require('mongoose')
// inicializa o express atraves de uma variavel que recebe a funcao express
const app = express()

//forma de ler JSON / middlewares (recursos que sao executados entre requisicoes e resposta (REQuire e RESponse))
app.use(
	express.urlencoded({
		extended: true
	})
)

app.use(express.json())

//rotas da API

const personRoutes = require('./routes/personRoutes')
const jobRoutes = require('./routes/jobRoutes')

//tudo que for solicitado na chamada da rota /person sera direcionado para o arquivo personRoutes.js
// Esse direcionamento acontece pela funcao abaixo
app.use('/person', personRoutes)
app.use('/job', jobRoutes)
 
//criar um endpoint inicial
app.get('/', (req, res) => {
	//mostrar req
	res.json({msg: 'Primeira API RESTfull'})
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

// funcao para conectar a aplicacao com o BD
mongoose.connect(`mongodb+srv://${ DB_USER }:${ DB_PASSWORD }@fullstackproject.iv7jp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
	.then(() => {
		//entregar uma porta para poder acessar essa rota
		app.listen(3000)
		console.log('Conectado ao MongoDB')
	})
	.catch((err) => {
		console.log('ERRO AO CONECTAR AO MongoDB')
		console.log(err)

	})