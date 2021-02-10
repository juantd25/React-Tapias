const jwt = require('jsonwebtoken');
const config = require('../../models/config');

function verifyToken(req, res, next) {
	const token = req.session.token;
	if (!token) {
		return res.json({
			auth: false,
			message: 'No token provided'
		});
	}

	const decoded = jwt.verify(token, config.secret);
	req.userId = decoded.id;
	req.userNit = decoded.NIT;
	next();
}

module.exports = verifyToken;
