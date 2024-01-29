const PORT = process.env.PORT ?? 8000;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

// Controller
const {
	getAllTodos,
	getTodosById,
	createTodos,
	updateTodos,
	deleteTodos,
} = require("./controller/TodosController");
const { signIn, signUp } = require("./controller/UserController");

app.use(cors());

// Auth
app.post("/signIn", signIn);
app.post("/signUp", signUp);

// Route Todos
app.get("/todos/:email", getAllTodos);
app.get("/todos/:id", getTodosById);
app.post("/todos/create", createTodos);
app.patch("/todos/update", updateTodos);
app.delete("/todos/delete", deleteTodos);

app.listen(PORT, function () {
	console.log(`Successfully Server Running in Port : ${PORT}`);
});
