var Config = {};
Config.db = {};
Config.app={};
Config.auth = {};

Config.db.host = 'ds019654.mlab.com:19654';
Config.db.name = 'heroku_29b0d3wd';
Config.db.user = 'heroku_29b0d3wd';
Config.db.pass = '9k23k5a0u2onr2shdmvvlls9m4';


// Use environment defined port or 3000
Config.app.port = process.env.PORT || 3000;

Config.auth.jwtSecret = "very secret secret";

module.exports = Config;