const db = require("./../db");
const UUID = require("uuid-int");

db.connect()
	.then((res) => {
		console.log(`Database Connected`);
	})
	.catch((err) => {
		console.log(`Database Unconnected : ${err}`);
	});

const getAllTodos = async (req, res) => {
	const { email } = req.params;

	try {
		const dataTodos = await db.query(
			"SELECT * FROM todos WHERE user_email=$1 ORDER BY id DESC",
			[email]
		);
		return res.status(200).json({
			status: 200,
			message: "Successfully Get Data Todos",
			data: dataTodos.rows,
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: "Error Get Data Todos : " + error.message,
			data: [],
		});
	}
};

const getTodosById = async (req, res) => {
	try {
		const { id } = req.params;
		const dataTodos = await db.query(`SELECT * FROM todos WHERE id = $1`, [
			id,
		]);
		return res.status(200).json({
			status: 200,
			message: "Successfully Get Data Todos",
			data: dataTodos.rows,
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: "Error Get Data Todos : " + error.message,
			data: [],
		});
	}
};

const createTodos = async (req, res) => {
	const { user_email, title, progress, date } = req.body;

	try {
		const getTotalLengthDataTodos = await db.query("SELECT id FROM todos");

		db.query(
			"INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)",
			[
				parseInt(getTotalLengthDataTodos.rowCount + 1),
				user_email,
				title,
				progress,
				date,
			]
		);

		return res.status(200).json({
			status: 200,
			message: "Successfully Create Data Todos",
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			status: 500,
			message: "Error Create Data Todos : " + error.message,
		});
	}
};

const updateTodos = async (req, res) => {
	const { id, title, progress } = req.body;

	try {
		db.query("UPDATE todos SET title=$1, progress=$2 WHERE id=$3", [
			title,
			progress,
			id,
		]);

		return res.status(200).json({
			status: 200,
			message: "Successfully Update Data Todos",
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			status: 500,
			message: "Error Update Data Todos : " + error.message,
		});
	}
};

module.exports = {
	getAllTodos,
	getTodosById,
	createTodos,
	updateTodos,
};
