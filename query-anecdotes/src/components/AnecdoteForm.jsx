  import { useMutation, useQueryClient } from '@tanstack/react-query'
  import { createAnecdote } from '../requests'

  const AnecdoteForm = () => {
    const getId = () => (100000 * Math.random()).toFixed(0)
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation({
      mutationFn: createAnecdote,
      onSuccess:(newAnecdote)=>{
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }})
    const onCreate = async(event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content, id:getId(),votes: 0 })
      console.log('new anecdote',content)
  }


    return (
      <div>
        <h3>create new</h3>
        <form onSubmit={onCreate}>
          <input name='anecdote' />
          <button type="submit">create</button>
        </form>
      </div>
    )
  }

  export default AnecdoteForm
