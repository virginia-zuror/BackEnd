const express = require ('express');

const PORT = 8080;
const server = express();

const router = express.Router();

router.get('/', (req, res)=>{
    res.send('<h1 color="rgb(255, 0, 0)">Hello master of the Ring!💍</h1>');
});

router.get('/movies', (req, res)=>{
    const movies = ['The Fellowship of the Ring', 'The Two Towers', 'The Return of the King'];
    res.send(movies);
});

router.get('/characters', (req, res) => {
    const characters = ['Aragorn', 'Frodo', 'Sam'];
    res.send(characters);
  });

server.use('/', router);

server.listen(PORT, ()=>{
    console.log(`Server running in http://localhost:${PORT}`);
});