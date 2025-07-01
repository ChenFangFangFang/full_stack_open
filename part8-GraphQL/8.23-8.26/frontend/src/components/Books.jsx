import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FIND_BOOKS_BY_GENRE } from '../queries'

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState('all')
  
  const allBooksResult = useQuery(ALL_BOOKS)
  const filteredBooksResult = useQuery(FIND_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
    skip: selectedGenre === 'all'
  })

  if (allBooksResult.loading || (selectedGenre !== 'all' && filteredBooksResult.loading)) {
    return <div>loading...</div>
  }

  const books = selectedGenre === 'all' 
    ? allBooksResult.data?.allBooks || []
    : filteredBooksResult.data?.findBooksByGenre || []

  // Get unique genres from all books (using allBooks query result)
  const genres = ['all', ...new Set((allBooksResult.data?.allBooks || []).flatMap(book => book.genres))]

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre)
    if (genre !== 'all') {
      // Refetch the filtered books when selecting a genre
      filteredBooksResult.refetch({ genre })
    }
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        {genres.map(genre => (
          <button 
            key={genre}
            onClick={() => handleGenreSelect(genre)}
            style={{ 
              margin: '0 5px',
              backgroundColor: selectedGenre === genre ? '#007bff' : '#fff',
              color: selectedGenre === genre ? '#fff' : '#000'
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
              <td>{book.genres.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
