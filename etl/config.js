var convict = require('convict');
 
// Define a schema
var config = convict({
  apiUrl: {
    default: 'http://127.0.0.1:3030',
    env: 'API_URL',
  },
});
 
// Perform validation
config.validate({allowed: 'strict'});
 
module.exports = config;
