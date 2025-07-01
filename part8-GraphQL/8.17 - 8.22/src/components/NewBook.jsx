import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, ADD_BOOK, FIND_BOOKS_BY_GENRE } from '../queries'
import { useNavigate } from 'react-router-dom'

const NewBook = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [error, setError] = useState('')

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      ...genres.map(g => ({
        query: FIND_BOOKS_BY_GENRE,
        variables: { genre: g }
      }))
    ],
    onCompleted: () => {
      navigate('/books')
    },
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    
    // Clear any previous errors
    setError('')
    
    const publishedInt = parseInt(published)
    
    addBook({ variables: { title, author, published: publishedInt, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      {error && (
        <div style={{color: 'red', marginBottom: '10px'}}>
          {error}
        </div>
      )}
      
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook