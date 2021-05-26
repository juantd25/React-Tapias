const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function (req, res) {
  const {email, phoneNumber, password, displayName} = req.body;

  // Validar campos
  if (!email) return res.status(404).send({err: 'no se ha enviado el email'});
  if (!phoneNumber)
    return res.status(404).send({err: 'no se ha enviado el phoneNumber'});
  if (!password)
    return res.status(404).send({err: 'no se ha enviado el password'});
  if (!displayName)
    return res.status(404).send({err: 'no se ha enviado el displayName'});

  // Crear el usuario
  admin
    .auth()
    .createUser({
      email,
      phoneNumber,
      password,
      displayName,
    })
    .then(userRecord => {
      const code = Math.floor(Math.random() * 99999);
      return twilio.messages
        .create({
          body: 'Your code is ' + code,
          from: '+13605024714',
          to: '+573147499628',
        })
        .then(message => res.send(userRecord));
    })
    .catch(error => {
      return res.status(500).send({err: 'algo salio mal', error});
    });

  // Retornar información
};
