const express = require('express');
const router = express.Router();
const { dbUsers } = require('../db/config_db');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../models/config');

router.post('/signup', async (req, res) => {
	const { ADMIN, CARGO, CEDULA, ENTIDAD, NIT, NOMBRE_PERSONA, PASSWORD, TIPO_VINCULACION } = req.body;

	const user = new User({
		ADMIN,
		CARGO,
		CEDULA,
		ENTIDAD,
		NIT,
		NOMBRE_PERSONA,
		PASSWORD,
		TIPO_VINCULACION,
		FECHA_NACIMIENTO: '2020-01-01',
		PERSONID: '',
		GENERO: ''
	});
	user.PASSWORD = await user.encryptPassword(user.PASSWORD);

	//Insert a la DB
	const newUser = await dbUsers
		.insert(user)
		.then(doc => {
			return doc;
		})
		.catch(console.error);
	res.json({ auth: true, token: false });
	// const token = jwt.sign({ id: user.id }, config.secret, {
	// 	expiresIn: 60 * 60 * 30
	// });

	// req.session.token = token;
});

router.post('/signin', async (req, res) => {
	let { CEDULA, PASSWORD } = req.body;
	CEDULA = parseInt(CEDULA);

	const user = new User({
		CEDULA,
		PASSWORD
	});

	//Consultar a la DB
	const user2 = await dbUsers
		.query({ CEDULA: CEDULA })
		.then(doc => {
			if (doc.length > 0) {
				return doc;
			}
		})
		.catch(console.log);

	if (!user2) {
		return res.json({ auth: false, token: false, user: false });
	}

	const valid = await user.validatePassword(PASSWORD, user2[0].PASSWORD);
	console.log(valid);
	if (!valid) {
		return res.json({ auth: false, token: false, password: false });
	}

	const token = jwt.sign({ id: user2[0]._id, NIT: user2[0].NIT }, config.secret, {
		expiresIn: 60 * 60 * 30
	});

	req.session.token = token;
	res.json({ auth: true, token: true });
});

router.get('/auth', async (req, res) => {
	req.session.save();

	if (!req.session.token) {
		return res.json({ auth: false, token: false });
	}

	// console.log(req.session);
	const decoded = jwt.verify(req.session.token, config.secret);

	//Consultar a la DB
	const user = await dbUsers
		.query({ _id: decoded.id })
		.then(doc => {
			if (doc.length > 0) {
				return doc;
			}
		})
		.catch(console.error);

	if (!user) {
		req.session.destroy();
		return res.json({ auth: false, token: false });
	}
	res.json({ auth: true, token: true });
});

router.get('/signout', async (req, res) => {
	req.session.destroy();
	res.json({ auth: false, token: false });
});

module.exports = router;
