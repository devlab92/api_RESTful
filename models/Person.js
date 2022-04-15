// Models fazem a conexao direta com o BD
const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
	name: String,
	lastName: String,
	age: Number,
	cpf: String,
	child: Object
})

module.exports = Person