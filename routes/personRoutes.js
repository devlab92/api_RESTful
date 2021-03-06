const router = require('express').Router()
const Job = require('../models/Job.js')

router.post('/', async (req, res) => {
	// req.body
	// cria res variaveis de uma vez
	// entendendo que o retorno da rota sera na seguinte estrutura
	// {name: 'Luiz', salaray: 5000, approved: true}
	const {name, lastName, age, cpf, child} = req.body


	// faz uma verificacao antes de enviar o comando para o BD
	if (!name) {
		res.status(422).json({error: 'O campo nome eh obrigatorio!'})
		return
	} else if (!lastName) {
		res.status(422).json({error: 'O campo sobrenome eh obrigatorio!'})
		return
	} else if (!age) {
		res.status(422).json({error: 'O campo idade eh obrigatorio!'})
		return
	} else if (!cpf) {
		res.status(422).json({error: 'O campo cpf eh obrigatorio!'})
		return
	}

	// Cria um obj com os dados para serem inseridos no registro
	const person = {
		name, 
		lastName, 
		age, 
		cpf, 
		child
	}

	//Create - criacao de daos
	try {
		// Person.create eh o comando no mongo para a criacao de um novo registro na collection Person(ou people)
		await Person.create(person)
		res.status(201).json({message: 'Pessoa inserida com sucesso!'})

	} catch (error) {
		res.status(500).json({error: error})
	}
})


//Read - Leitura de dados
//OBS: a rota nesse caso tem o mesmo nome da rota de criacao. Mas o tipo de requisicao eh diferente
// Aqui estamos chamando uma rota com GET para criacao chamamos com POST
router.get('/', async (req, res) => {

	try {
		const people = await Person.find()

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
		const person = await Person.findOne({_id: id})

		if (!person) {
			res.status(422).json({message: 'Usuario nao encontrado!'})
			return
		}
		res.status(200).json(person)

	} catch (error) {
		res.status(500).json({error: error})
	}
})

// UPDATE - Atualozacap de dados PUT e PATCH
// PUT - Eh preciso enviar o objeto completo na rota
// PATCH - Eh uma atualizcao parcial. Pode ser enviado um unico campo somente
router.patch('/:id', async (req, res) => {
	console.log(`PATCH`)
	const id = req.params.id
	const {name, lastName, age, cpf, child} = req.body
	let person = {}

	if(name.trim() == '' || lastName.trim() == '' || age == '' || cpf.trim() == '' || child.trim() == ''){
		res.status(422).json({message: '?? preciso pelo menos 1 campo para realizar alguma altera????o!'})
		return
	}
	// faz uma verificacao antes de enviar o comando para o BD
	if (name) {
		person = {...person, name: name}
	} 
	if (lastName) {
		person = {...person, lastName: lastName}
	} 
	if (age) {
		person = {...person, age: age}
	} 
	if (cpf) {
		person = {...person, cpf: cpf}
	}
	if (cpf) {
		person = {...person, cpf: cpf}
	}

	try {
		//Chama a funcao que quer que o BD execute passando o ID e o objeto para ser atualizado
		const updatePerson = await Person.updateOne({_id: id}, person)

		//Imprime algumas informacoes sobre a operacao no banco de dados
		console.log('updatePerson ')
		console.log(updatePerson)

		//Se nao houve registros alterados, entao envia msg
		if (updatePerson.matchedCount == 0) {
			res.status(422).json({error: 'Nao houve nenhuma modificacao!'})
			return
		}
		res.status(200).json(person)

	} catch (error) {
		res.status(500).json({error: error})

	}
})

// DELETE - Deleta algum registro
router.delete('/:id', async (req, res) => {
	const id = req.params.id

	// Essa variavel e a condicao abaixo servem para verificar se existe o usuario passado
	//Caso nao exista ele evia msg e interrompe a funcao
	const person = await Person.findOne({_id: id})
	if (!person) {
		res.status(422).json({message: 'Usuario nao ecnontrado!'})
		return
	}

	try {
		const person = await Person.deleteOne({_id: id})
		res.status(200).json({message: 'Usuario deletado com sucesso!'})

	} catch (error) {
		res.status(500).json({error: error})
	}
})


module.exports = router