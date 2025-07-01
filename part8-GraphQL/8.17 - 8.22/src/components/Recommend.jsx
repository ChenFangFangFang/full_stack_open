const Recommend = (props) => {
    const books = props.books || []

    // Find the genre that appears most frequently
    const genreCounts = books.reduce((acc, book) => {
        book.genres.forEach(genre => {
            acc[genre] = (acc[genre] || 0) + 1
        })
        return acc
    }, {})

    const favoriteGenre = Object.entries(genreCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || ''

    const recommendedBooks = books.filter(book => 
        book.genres.includes(favoriteGenre)
    )

    return (
        <div>
            <h2>Recommendations</h2>
            <p>Books in your favorite genre <strong>{favoriteGenre}</strong>:</p>

            <table>
                <tbody>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {recommendedBooks.map((book) => (
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend