import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState(0);
  const [description, setDescription] = useState("");
  const [bookList, setBookList] = useState([]);

  const addBook = () => {
    Axios.post("http://127.0.0.1:3001/create", {
      title: title,
      author: author,
      publicationYear: publicationYear,
      description: description,
    }).then(() => {
      setBookList([
        ...bookList,
        {
          title: title,
          author: author,
          publicationYear: publicationYear,
          description: description,
        },
      ]);
    });
  };
  const getBook = () => {
    Axios.get("http://127.0.0.1:3001/books").then((response) => {
      setBookList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="book-infomation">
        <label>Title :</label>
        <input
          type="text"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label>Author :</label>
        <input
          type="text"
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
        />{" "}
        <label>Publication Year :</label>
        <input
          type="number"
          onChange={(event) => {
            setPublicationYear(event.target.value);
          }}
        />{" "}
        <label>Description :</label>
        <input
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />{" "}
        <button onClick={addBook}>Search</button>
      </div>
      <br />
      <div className="showBooks">
        <button onClick={getBook}>Show Books</button>

        {bookList.map((val, key) => {
          return (
            <div className="showBook">
              <h3>Title : {val.title}</h3>
              <h3>Author : {val.author}</h3>
              <h3>Publication Year : {val.publicationYear}</h3>
              <h3>Description : {val.description}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
