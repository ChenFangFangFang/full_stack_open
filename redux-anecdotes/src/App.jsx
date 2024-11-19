import AddAne from './components/AddAne'
import Anecdotes from './components/Anecdotes' 
import Filter from './components/Filter'
import Notification from './components/Notification';

const App = () => {
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