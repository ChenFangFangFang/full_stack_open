import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Notify from "./components/Notify";
import Recommend from "./components/Recommend";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS,ALL_BOOKS } from "./queries";
import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <Router>
        <div>
          <Link to="/authors">Authors</Link>{' | '}
          <Link to="/books">Books</Link>{' | '}
          <Link to="/login">Login</Link>

          <Notify errorMessage={errorMessage} />
          
          <Routes>
            <Route path="/" element={<Navigate replace to="/books" />} />
            <Route path="/authors" element={<Authors authors={authors.data?.allAuthors || []} />} />
            <Route path="/books" element={<Books books={books.data?.allBooks || []} />} />
            <Route path="/login" element={<Login setToken={setToken} setError={notify} />} />
            <Route path="*" element={<Navigate replace to="/books" />} />
          </Routes>
        </div>
      </Router>
    )
  }

  if (authors.loading || books.loading) {
    return <div>Loading...</div>
  }

  if (authors.error) {
    return <div>Error loading authors: {authors.error.message}</div>
  }

  if (books.error) {
    return <div>Error loading books: {books.error.message}</div>
  }

  if (!authors.data || !books.data) {
    return <div>No data available</div>
  }

  return (
    <Router>
      <div>
        <Link to="/authors">Authors</Link>{' | '}
        <Link to="/books">Books</Link>{' | '}
        <Link to="/add">Add Book</Link>{' | '}
        <Link to="/recommend">Recommend</Link>{' | '}
        <button onClick={logout}>Logout</button>

        <Routes>
          <Route path="/" element={<Navigate replace to="/books" />} />
          <Route path="/authors" element={<Authors authors={authors.data.allAuthors || []} />} />
          <Route path="/books" element={<Books books={books.data.allBooks || []} />} />
          <Route path="/add" element={<NewBook books={books.data.allBooks || []} />} />
          <Route path="/recommend" element={<Recommend books={books.data.allBooks || []} />}  />
          <Route path="*" element={<Navigate replace to="/books" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
