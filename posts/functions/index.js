const functions = require('firebase-functions');
const createUser = require('./createUser');
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.createUser = functions.https.onRequest(createUser);
