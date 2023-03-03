const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "http://127.0.0.1",
  password: "1234",
  database: "react_assignment",
  port: "3306",
});

app.post("/create", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const publicationYear = req.body.publicationYear;
  const description = req.body.description;

  db.query(
    "INSERT INTO books (title,author,publicationYear,description) VALUES (?,?,?,?)",
    [title, author, publicationYear, description],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Data as Row Inserted!");
      }
    }
  );
});

app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("yap, your express server runs at 3001!");
});
