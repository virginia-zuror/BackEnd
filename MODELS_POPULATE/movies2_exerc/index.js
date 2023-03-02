const express = require("express")
const connect = require("./src/utils/database")

const dotenv= require("dotenv")


dotenv.config();
const PORT= process.env.PORT;
const server = express();
connect();

server.use(express.json());
server.use(express.urlencoded({ extended: false}));

//Routes de movies
const movieRoutes = require("./src/routes/movie.routes");
server.use("/api/movies", movieRoutes);

//Routes de cinemas
const cinemasRoutes = require("./src/routes/cinema.routes");
server.use("/api/cinemas", cinemasRoutes);


server.use("*", (req, res, next)=>{
    const error = new Error("Route not found");
    error.status=404;
    next(error);
})


server.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})