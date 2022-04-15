// Models fazem a conexao direta com o BD
const mongoose = require('mongoose')

const Job = mongoose.model('Job', {
	name: String,
	salary: Number,
	position: String
})

module.exports = Job