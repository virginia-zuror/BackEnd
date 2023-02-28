const express = require('express');

const PORT = 8080;
const server = express();

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome!!');
});

router.get('/movies/:movie', (req, res) => {
    const nameMovie = req.params.movie
  const movies = ['The Fellowship of the Ring', 'The Two Towers', 'The Return of the King', 'An Unexpected Journey', 'The Desolation of Smaug', 'The Battle of the Five Armies'];
  const findMovieIndex = movies.indexOf(nameMovie);
  if(findMovieIndex === -1){
    res.send('La película no existe en el registro');
  }else{
    res.send(`<h2 ${color='red'}>${movies[findMovieIndex]}</h2>`);
  }
  
});

server.use('/', router);

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});