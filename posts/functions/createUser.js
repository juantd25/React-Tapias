const admin = require('firebase-admin');

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
      return res.status(200).send(userRecord);
    })
    .catch(error => {
      return res.status(500).send({err: 'algo salio mal', error});
    });

  // Retornar información
};
