const db = require("./../db");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

db.connect()
	.then((res) => {
		console.log(`Database Connected`);
	})
	.catch((err) => {
		console.log(`Database Unconnected : ${err}`);
	});

const signUp = async (req, res) => {
	const { email, password } = req.body;
	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);

	try {
		db.query("INSERT INTO users(email, hashed_password) VALUES($1, $2)", [
			email,
			hashedPassword,
		])
			.then((response) => {
				const token = jsonwebtoken.sign({ email }, "secret", {
					expiresIn: "1hr",
				});

				return res.status(200).json({
					status: 200,
					message: "Successfully Create Data User",
					token: token,
				});
			})
			.catch((err) => {
				return res.status(500).json({
					status: 500,
					message: "Error Create Data User",
					detailError: err.message,
				});
			});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: "Error Create Data User",
			detailError: error.detail,
		});
	}
};

const signIn = async (req, res) => {
	const { email, password } = req.body;

	try {
		const users = await db.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);

		if (users.rows.length == 0) {
			return res.status(404).json({
				status: 404,
				message: "Data users not found!",
			});
		}

		const checkPassword = await bcrypt.compare(
			password,
			users.rows[0].hashed_password
		);

		const token = jsonwebtoken.sign({ email }, "secret", {
			expiresIn: "1hr",
		});

		if (checkPassword) {
			return res.status(200).json({
				status: 200,
				message: "Successfully Sign In",
				token: token,
			});
		} else {
			return res.status(401).json({
				status: 401,
				message: "Your password wrong, please try again",
			});
		}
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: "Error Sign In",
			detailError: error.detail,
		});
	}
};

module.exports = {
	signUp,
	signIn,
};
