const router = require('express').Router()
const Job = require('../models/Job.js')

router.post('/', async (req, res) => {
	// req.body
	// cria res variaveis de uma vez
	// entendendo que o retorno da rota sera na seguinte estrutura
	// {name: 'Luiz', salaray: 5000, approved: true}
	const {name, salary, position} = req.body


	// faz uma verificacao antes de enviar o comando para o BD
	if (!name) {
		res.status(422).json({error: 'O campo nome eh obrigatorio!'})
		return
	} else if (!salary) {
		res.status(422).json({error: 'O campo sobrenome eh obrigatorio!'})
		return
	} else if (!position) {
		res.status(422).json({error: 'O campo idade eh obrigatorio!'})
		return
	} 

	// Cria um obj com os dados para serem inseridos no registro
	const job = {
		name, 
		salary, 
		position
	}

	//Create - criacao de daos
	try {
		// job.create eh o comando no mongo para a criacao de um novo registro na collection job(ou people)
		await Job.create(job)
		res.status(201).json({message: 'Trabalho inserido com sucesso!'})

	} catch (error) {
		res.status(500).json({error: error})
	}
})


//Read - Leitura de dados
//OBS: a rota nesse caso tem o mesmo nome da rota de criacao. Mas o tipo de requisicao eh diferente
// Aqui estamos chamando uma rota com GET para criacao chamamos com POST
router.get('/', async (req, res) => {

	try {
		const job = await Job.find()

		res.status(200).json(people)

	} catch (error) {
		res.status(500).json({error: error})
	}

})

// Rota para retornar um registro especifico
// nesse caso, vamos retornar uma pessoa pelo seu id
router.get('/:id', async (req, res) => {
	// armazena o ID passado na url
	const id = req.params.id

	try {
		const job = await Job.findOne({_id: id})

		if (!job) {
			res.status(422).json({message: 'Trabalho nao encontrado!'})
			return
		}
		res.status(200).json(job)

	} catch (error) {
		res.status(500).json({error: error})
	}
})

// UPDATE - Atualozacap de dados PUT e PATCH
// PUT - Eh preciso enviar o objeto completo na rota
// PATCH - Eh uma atualizcao parcial. Pode ser enviado um unico campo somente
router.patch('/:id', async (req, res) => {
	const id = req.params.id
	const {name, salary, position} = req.body
	let job = {}

	if(name.trim() == '' || salary == '' || position.trim() == ''){
		res.status(422).json({message: 'É preciso pelo menos 1 campo para realizar alguma alteração!'})
		return
	}
	// faz uma verificacao antes de enviar o comando para o BD
	if (name) {
		job = {...job, name: name}
	} 
	if (salary) {
		job = {...job, lastName: lastName}
	} 
	if (position) {
		job = {...job, age: age}
	} 

	try {
		//Chama a funcao que quer que o BD execute passando o ID e o objeto para ser atualizado
		const updateJob = await Job.updateOne({_id: id}, job)

		//Imprime algumas informacoes sobre a operacao no banco de dados
		console.log('updateJob ')
		console.log(updateJob)

		//Se nao houve registros alterados, entao envia msg
		if (updateJob.matchedCount == 0) {
			res.status(422).json({error: 'Nao houve nenhuma modificacao!'})
			return
		}
		res.status(200).json(job)

	} catch (error) {
		res.status(500).json({error: error})

	}
})

// DELETE - Deleta algum registro
router.delete('/:id', async (req, res) => {
	const id = req.params.id

	// Essa variavel e a condicao abaixo servem para verificar se existe o usuario passado
	//Caso nao exista ele evia msg e interrompe a funcao
	const job = await Job.findOne({_id: id})
	if (!job) {
		res.status(422).json({message: 'Trabalho nao ecnontrado!'})
		return
	}

	try {
		const job = await Job.deleteOne({_id: id})
		res.status(200).json({message: 'Trabalho deletado com sucesso!'})

	} catch (error) {
		res.status(500).json({error: error})
	}
})


module.exports = router