const express = require('express');
const router = express.Router();
const { dbUsers } = require('../db/config_db');
const verifyToken = require('./middlewares/verifyToken');
const User = require('../models/User');
require('dotenv').config();
const { delFaceId } = require('./delFaceId');

//Obtener todos los productos
router.post('/get', verifyToken, async (req, res) => {
	let queryCloudant = {
		selector: {
			_id: {
				$ne: '0'
			},
			NIT: {
				$eq: req.userNit
			}
		},
		limit: 1000
	};
	dbUsers
		.query(queryCloudant)
		.then(docs => {
			res.json(docs);
			// console.log(docs);
		})
		.catch(console.log);
});

//Insertar nuevo producto
router.post('/add', verifyToken, async (req, res) => {
	if (!req.body.rows) {
		const user = new User({
			ADMIN: req.body.ADMIN,
			CEDULA: req.body.CEDULA,
			NOMBRE_PERSONA: req.body.NOMBRE_PERSONA,
			ENTIDAD: req.body.ENTIDAD,
			TIPO_VINCULACION: req.body.TIPO_VINCULACION,
			CARGO: req.body.CARGO,
			FECHA_NACIMIENTO: req.body.FECHA_NACIMIENTO,
			PERSONID: req.body.PERSONID,
			GENERO: req.body.GENERO,
			PASSWORD: req.body.PASSWORD,
			NIT: req.userNit
		});

		if (user.PASSWORD) {
			user.PASSWORD = await user.encryptPassword(user.PASSWORD);
		}

		const ok = await dbUsers.query({ CEDULA: user.CEDULA });
		if (ok.length > 0) {
			res.json('Persona ya existe');
		} else {
			dbUsers
				.insert(user)
				.then(doc => res.json('Persona creada'))
				.catch(console.log);
		}
	} else {
		const object = req.body.rows;
		var max = 0;
		let arrayUsers = new Array();
		let arrayCedulas = new Array();
		for (const key in object) {
			max++;
			if (object.hasOwnProperty(key)) {
				const row = object[key];
				if (key !== '0') {
					if (row.length > 0) {
						const user = new User({
							ADMIN: false,
							CEDULA: row[0],
							NOMBRE_PERSONA: row[1],
							ENTIDAD: row[2],
							TIPO_VINCULACION: row[3].toUpperCase(),
							CARGO: row[4],
							FECHA_NACIMIENTO: '',
							PERSONID: '',
							GENERO: '',
							PASSWORD: '',
							NIT: req.userNit
						});

						arrayUsers.push(user);
						arrayCedulas.push(user.CEDULA);
					}
					if (object.length === max) {
						let query = {
							selector: {
								CEDULA: {
									$in: arrayCedulas
								}
							},
							fields: ['CEDULA'],
							limit: 1000
						};

						dbUsers.query(query).then(docs => {
							if (docs.length > 0) {
								var usersForInsert = arrayUsers;
								docs.map(p => {
									var elementPos = arrayUsers
										.map(function (person) {
											return person.CEDULA;
										})
										.indexOf(p.CEDULA);
									usersForInsert.splice(elementPos, 1);
								});
							}
							if (usersForInsert.length > 0) {
								dbUsers.insert(usersForInsert).then(ok => {
									console.log(ok);
									res.json('Usuarios creados');
								});
							} else {
								res.json('Personas ya existen');
							}
						});
					}
				}
			}
		}
		// if (creados) {

		// } else {
		// 	res.json('Personas ya existen');
		// }
	}
});

//Borrar doc en master_catalog
router.delete('/:id', verifyToken, async (req, res) => {
	delFaceId(req.params.id);
	dbUsers.delete(req.params.id);
	res.json('Registro borrado');
});

//Obtener docs de master_catalog por ID
router.get('/:id', verifyToken, async (req, res) => {
	dbUsers
		.get(req.params.id)
		.then(doc => {
			res.json(doc);
		})
		.catch(console.log);
});

//Actualizar doc en master_catalog
router.put('/:id', verifyToken, async (req, res) => {
	const doc = await dbUsers.query({ CEDULA: parseInt(req.body.CEDULA) });

	let user = new User({
		ADMIN: req.body.ADMIN,
		CEDULA: req.body.CEDULA,
		NOMBRE_PERSONA: req.body.NOMBRE_PERSONA,
		ENTIDAD: req.body.ENTIDAD,
		TIPO_VINCULACION: req.body.TIPO_VINCULACION,
		CARGO: req.body.CARGO,
		FECHA_NACIMIENTO: req.body.FECHA_NACIMIENTO,
		PERSONID: req.body.PERSONID,
		GENERO: req.body.GENERO,
		PASSWORD: req.body.PASSWORD,
		NIT: req.userNit
	});
	if (!req.body.PASSWORD) {
		if (doc[0].PASSWORD) {
			user.PASSWORD = doc[0].PASSWORD;
		}
	} else {
		user.PASSWORD = await user.encryptPassword(user.PASSWORD);
	}

	// const doc = await dbUsers.query({ CEDULA: user.CEDULA });
	if (doc.length > 0) {
		if (doc[0]._id === req.params.id) {
			dbUsers
				.update(req.params.id, user)
				.then(ok => res.json('Registro actualizado'))
				.catch(console.log);
		} else {
			return res.json('Persona ya existe');
		}
	} else {
		dbUsers
			.update(req.params.id, user)
			.then(ok => res.json('Registro actualizado'))
			.catch(console.log);
	}
});

module.exports = router;
