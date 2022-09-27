const pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/meeting_booker";
let db = pgp(connectionString);

module.exports = db;
