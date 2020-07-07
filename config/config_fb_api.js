const config = require('config');

module.exports = {    
    "facebook_api_key": config.get('facebook_api_key'),
    "facebook_api_secret": config.get('facebook_api_secret'),
    "callback_url": "http://localhost:3000/api/facebook/auth/callback",
    "use_database": false,
    "host": "localhost",
    "username": "root",
    "password": "",
    "database": "Database Name"   
}