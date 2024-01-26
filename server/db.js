const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
	user: process.env.POSTGRES_USERNAME,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DATABASE,
	max: 10,
	idleTimeoutMillis: 60000,
});

module.exports = pool;
