const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connect = require('./utils/connect');

const { configCloudinary } = require('./middlewares/files.middlewares');
const CharactersRoutes = require('./api/routes/characters.routes.js');
const LineagesRoutes = require('./api/routes/lineages.routes.js');

dotenv.config();

configCloudinary();
const server = express();
server.use('/public', express.static('public'));

const PORT = process.env.PORT;

connect();

server.use(
  cors({
    origin: 'http://localhost:8082',
    credentials: true,
  })
);

server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ limit: '5mb', extended: true }));

server.use('/api/characters', CharactersRoutes);
server.use('/api/lineages', LineagesRoutes);

server.use('*', (req, res, next) => {
  const error = new Error('Route not found 😿');
  error.status = 404;
  return next(error);
});

server.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || 'Unexpected error');
});

server.disable('x-powered-by');

server.listen(PORT, () => {
  console.log(`Server listening on port 🙈: ${PORT}`);
});
