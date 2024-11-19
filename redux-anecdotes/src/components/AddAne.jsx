import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdotesService from '../services/anecdotes'
const AddAne = () => {
    const dispatch = useDispatch()
    const addAne = async (event) => {
        event.preventDefault();
        const content = event.target.ane.value; // Fixed input name
        event.target.ane.value  = ''
        const newAne = await anecdotesService.createNew(content)
        dispatch(addAnecdote(newAne))

      }
      return (
        <div>
          <h2>Create</h2>
          <form onSubmit={addAne}>
        <div><input name="ane"/></div>
        <button type='submit'>create</button>
      </form>
        </div>)
     
}

export default AddAne