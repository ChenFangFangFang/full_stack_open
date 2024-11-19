import AddAne from './components/AddAne'
import Anecdotes from './components/Anecdotes' 
import Filter from './components/Filter'
const App = () => {
  return (
   
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <AddAne />
    </div>
  )
}

export default App