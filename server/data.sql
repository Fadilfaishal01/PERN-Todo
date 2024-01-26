CREATE DATABASE todoapp;

CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email VARCHAR(255) NOT NULL,
    title VARCHAR(50),
    progress INT,
    date VARCHAR(100)
);

CREATE TABLE users {
    id INTEGER PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(100)
};