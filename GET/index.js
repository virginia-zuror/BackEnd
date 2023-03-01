const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connect = require("./src/utils/database");

const Title = require("./src/models/title.model");
const Author = require("./src/models/author.model");

const PORT = process.env.PORT;

const server = express();
const router = express.Router();

connect();


// TITLES

router.get("/titles", (req, res) => {
  return Title.find()
    .then((titles) => {
      return res.status(200).json(titles);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

router.get("/titles/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const title = await Title.findById(id);
    if (title) {
      return res.status(200).json(title);
    } else {
      return res.status(404).json("No title found in DB");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/titles/name/:name", async (req, res) => {
    const name = req.params.name;
    try {
      const title = await Title.find({name: name});
      if (title) {
        return res.status(200).json(title);
      } else {
        return res.status(404).json("No title found in DB");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  router.get("/titles/author/:author", async (req, res) => {
    const author = req.params.author;
    try {
      const title = await Title.find({author: author});
      if (title) {
        return res.status(200).json(title);
      } else {
        return res.status(404).json("No title found in DB");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  router.get("/titles/genre/:genre", async (req, res) => {
    const genre = req.params.genre;
    try {
      const title = await Title.find({genre: genre});
      if (title) {
        return res.status(200).json(title);
      } else {
        return res.status(404).json("No title found in DB");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  router.get("/titles/yeargreaterthan/:year", async (req, res) => {
    const year = req.params.year;
    try {
      const title = await Title.find({year: {$gt:year}});
      if (title) {
        return res.status(200).json(title);
      } else {
        return res.status(404).json("No title found in DB");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });


//AUTHORS

router.get("/authors", (req, res) => {
  return Author.find()
    .then((authors) => {
      return res.status(200).json(authors);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

router.get("/authors/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const author = await Author.findById(id);
      if (author) {
        return res.status(200).json(author);
      } else {
        return res.status(404).json("No author found in DB");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  router.get("/authors/country/:country", async (req, res) => {
    const country = req.params.country;
    try {
      const author = await Author.find({country: country});
      if (author) {
        return res.status(200).json(author);
      } else {
        return res.status(404).json("No author found in DB");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  router.get("/authors/yeargreaterthan/:year", async (req, res) => {
    const year = req.params.year;
    try {
      const author = await Author.find({born_year: {$gt:year}});
      if (author) {
        return res.status(200).json(author);
      } else {
        return res.status(404).json("No author found in DB");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });

server.use("/api/v1", router);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
