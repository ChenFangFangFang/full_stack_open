import { AuthorYear } from './AuthorYear'
const Authors = (props) => {
  const authors = props.authors || [];
  console.log("authors from authors component",authors)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorYear authors={authors}/>
    </div>
  )
}

export default Authors