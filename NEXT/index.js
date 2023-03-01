const express = require("express");
const dotenv = require("dotenv");
const connect = require("./src/utils/database");
dotenv.config();
const titleRoutes = require("./src/routes/titles.routes.js");
const authorRoutes = require("./src/routes/authors.routes.js")
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;

connect();

server.use("/titles", titleRoutes);
server.use("/authors", authorRoutes);

server.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

server.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
