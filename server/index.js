const server = require('./src/app.js');

const { conn } = require('./src/db.js');
const { PORT, DB_RESET } = process.env;

let dbReset = DB_RESET === "true" ? true : false

conn.sync({ force: dbReset }).then(() => {
	server.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`); // eslint-disable-line no-console
	});
});