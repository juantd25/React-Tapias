const express = require('express');
const morgan = require('morgan');
// const cfenv = require('cfenv');
const db = require('./db/config_db');
const app = express();
// const appEnv = cfenv.getAppEnv();
// const path = require('path');
const session = require('express-session');
// const verifyToken = require('./routes/verifyToken');
//Settings
app.set('port', process.env.PORT || 3001);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(
	session({
		secret: 'Flag-Control-Acceso',
		resave: true,
		saveUninitialized: true,
		cookie: {
			expires: false,
			maxAge: 1 * 1 * 30 * 60 * 1000 //dura 5 min   (dia * horas * minutos * segundos * milisegundos)
		}
	})
);
app.get('/censo/get', (req, res) => {
	res.redirect('/');
});
//Routes
app.use('/login', require('./routes/login.routes'));
app.use('/censo', require('./routes/censo.routes'));

//Static Files
app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 3001;
app.listen(port, '0.0.0.0', function () {
	console.log('server starting on ' + port);
});

app.get('*', (req, res) => {
	res.redirect('/');
});

db.initDb();

module.exports = app;
