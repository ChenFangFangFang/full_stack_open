import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation,useQueryClient, QueryClient} from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    
    onSuccess: () => {
        console.log('Mutation successful');
        queryClient.invalidateQueries({queryKey :['anecdotes']});
    },
    onError: (error) => {
        console.error('Mutation error:', error.message);
    },
});

  const handleVote = (anecdote) => {
    console.log('handleVote triggered for:', anecdote);
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    console.log('Updating anecdote:', updatedAnecdote);
    updateAnecdoteMutation.mutate(updatedAnecdote);
  }
  const result = useQuery({
    queryKey :['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })
  if (result.isLoading) {
    return <div>anecdote server not available due to problems in server</div>
  }
  if(result.isError){
    return <div>anecdote server not available due to problems in server</div>
  }
  console.log(JSON.parse(JSON.stringify(result)))
  
  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
