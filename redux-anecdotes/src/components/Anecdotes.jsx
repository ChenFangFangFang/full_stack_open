import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import PropTypes from 'prop-types'; 
const AneList = ({anecdote, handleVote} )=> {
    return(
        <div>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={handleVote}>vote</button>
        </div>
      </div>
    )
}
const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector((state) => state.filter); 
    const filteredAnecdotes = anecdotes
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes); // Still sort by votes
    return (
        <div>             
             {filteredAnecdotes.map(anecdote =>
                <AneList
             key={anecdote.id}
             anecdote={anecdote}
             handleVote={() => dispatch(voteAnecdote(anecdote.id, anecdote.content))}
             />)}
     
        </div>
  
    )
}
AneList.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  handleVote: PropTypes.func.isRequired,
}


export default Anecdotes