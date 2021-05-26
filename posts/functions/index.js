const functions = require('firebase-functions');
const createUser = require('./createUser');
const admin = require('firebase-admin');
const serviceAccount = require('./config/react-native-firebase-d849c-firebase-adminsdk-posom-f18d540711.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.createUser = functions.https.onRequest(createUser);
