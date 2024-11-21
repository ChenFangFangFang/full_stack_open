import { useEffect } from 'react';
import AddAne from './components/AddAne'
import Anecdotes from './components/Anecdotes' 
import Filter from './components/Filter'
import Notification from './components/Notification';
import  {initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  // useEffect(()=>{
  //   anecdotesService
  //     .getAll().then(anecdotes => dispatch(setAnecdote(anecdotes)))
  // })
  useEffect(() => {
    dispatch(initializeAnecdotes())
  },[])
  return (
   
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <AddAne />
    </div>
  )
}

export default App