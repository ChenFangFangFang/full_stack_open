import { BrowserRouter as Router, Route, Routes,Link } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS,ALL_BOOKS } from "./queries";
const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  console.log("authors",authors.data)
  console.log("books",books.data)
  if (authors.loading) {
    return <div>Author's data is loading...</div>
  }
  if (books.loading) {
    return <div>Book's data is loading...</div>
  }
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  return (

    <Router>
      <div>
        <Link to="/authors">Authors</Link>{' | '}
        <Link to="/books">Books</Link>{' | '}
        <Link to="/add">Add Book</Link>

        <Routes>
          <Route path="/"  />
          <Route path="/authors" element={<Authors authors={authors.data.allAuthors}  />} />
          <Route path="/books" element={<Books books ={books.data.allBooks}/>} />
          <Route path="/add" element={<NewBook books={books.data.allBooks} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
