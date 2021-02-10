const cloudant_url =
	'https://524755e8-b183-48ff-b1aa-974463787cec-bluemix:aeedf0fafa7dee2586ef09df93b4398116e14a58e5928a42db3f1aa28a55ec87@524755e8-b183-48ff-b1aa-974463787cec-bluemix.cloudant.com';
const dbUsers = require('cloudant-quickstart')(cloudant_url, 'face_control_acceso_usuarios');

const initDb = () => {
	dbUsers.create({ indexAll: false }).then(console.log).catch(console.log);
};

module.exports = { initDb, dbUsers };
