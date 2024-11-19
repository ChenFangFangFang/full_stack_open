import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from 'react-redux'
const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        const filterText = event.target.value;
    dispatch(filterChange(filterText));
      // input-field value is in variable event.target.value
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        <h3>Filter anecdotes</h3>
         <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter