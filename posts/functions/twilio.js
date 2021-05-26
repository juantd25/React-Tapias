const twilio = require('twilio');
const accountSid = 'ACd60b6c4e0d89e68686288181a8c6fdbf'; // Your Account SID from www.twilio.com/console
const authToken = '74a89784f5899c8647d191fed6d399e9'; // Your Auth Token from www.twilio.com/console

const client = twilio(accountSid, authToken, {
  lazyLoading: true,
});

module.exports = client;
