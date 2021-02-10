const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
	ADMIN: Boolean,
	CARGO: String,
	CEDULA: Number,
	ENTIDAD: String,
	NIT: Number,
	NOMBRE_PERSONA: String,
	PASSWORD: String,
	TIPO_VINCULACION: String,
	PERSONID: String,
	FECHA_NACIMIENTO: String,
	GENERO: String
});

userSchema.methods.encryptPassword = async password => {
	const salt = await bcrypt.genSalt(10); //Pasos del algoritmo de bcrypt
	return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function (password, passwordBcrypt) {
	return bcrypt.compare(password, passwordBcrypt);
};

module.exports = model('User', userSchema);
