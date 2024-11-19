import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AddAne = () => {
    const dispatch = useDispatch()
    const addAne = (event) => {
        event.preventDefault();
        const content = event.target.ane.value; // Fixed input name
        dispatch(addAnecdote(content))
        event.target.ane.value  = ''//ane is the name of input
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