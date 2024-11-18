import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
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
    const anecdotes = useSelector(state => state)
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

    return (
        <div>
             
             {sortedAnecdotes.map(anecdote =>
                <AneList
             key={anecdote.id}
             anecdote={anecdote}
             handleVote={() => dispatch(vote(anecdote.id))}/>)}
     
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