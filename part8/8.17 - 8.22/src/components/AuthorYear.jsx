import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS,UPDATE_AUTHOR } from '../queries'

export const AuthorYear = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [error, setError] = useState('')
    const authorName = props.authors.map(author => author.name) || []
    console.log("authorName",authorName)
    const [updateAuthor] = useMutation(UPDATE_AUTHOR,
        {
            refetchQueries: [{ query: ALL_AUTHORS }],
            onError: (error) => {
                const messages = error.graphQLErrors.map(e => e.message).join('\n')
                setError(messages)
              }
        }
    )   

    const submit = async (event) => {
        event.preventDefault()
        updateAuthor({ variables: { name, setBornTo: parseInt(born) } })
        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div >
                    name
                    <select value={name} onChange={({ target }) => setName(target.value)}>
                        <option value="">-- Select author --</option>
                        {authorName.map((a)=>(<option key={a} value={a}>{a}</option>))}
                    </select>                </div> 
                <div>born
                    <input value={born} onChange={({ target }) => setBorn(target.value)} />
                </div>
                
                <button type="submit">update author</button>
            </form>
        </div>
    )
}   