import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import PropTypes from 'prop-types'; // Import PropTypes for validation

const Anecdote = ({anecdote, handleVote} )=> {
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
    const anecdotes = useSelector(state => state)

    return (
        <div>
             <h2>Anecdotes</h2>
             {anecdotes.map(anecdote =>
                <Anecdotes 
             key={anecdote.id}
             anecdote={anecdote}
             handleClick={() => dispatch(vote(anecdote.id))}/>)}
     
        </div>
  
    )
}
Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  handleVote: PropTypes.func.isRequired,
}

export default Anecdotes