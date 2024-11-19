import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = anecdotesAtStart.map(asObject)
const anecdoteSlice = createSlice({
  name:'anecdote',
  initialState,
  reducers:{
    createAne(state, action){
      const content = action.payload
      state.push({
        content,
        votes:0,
        id:getId()
      })
    },
    vote(state, action) {
      const id = action.payload.id; // Extract the ID from the action
      const anecdote = state.find((anecdote) => anecdote.id === id); // Find the anecdote
      if (anecdote) {
        anecdote.votes += 1; // Directly update the votes
      }
    }
    
  }
})



export const {createAne,vote} = anecdoteSlice.actions

export const addAnecdote = (content) => {
  return (dispatch) => {
    dispatch(createAne(content));
    dispatch(showNotification(`You added: "${content}"`, 5000));
  };
};

// Thunk for voting with notification
export const voteAnecdote = (id, content) => {
  return (dispatch) => {
    dispatch(vote({ id }));
    dispatch(showNotification(`You voted for: "${content}"`, 5000));
  };
};


export default anecdoteSlice.reducer