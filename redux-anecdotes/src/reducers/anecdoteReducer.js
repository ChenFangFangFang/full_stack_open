import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer';
import anecdoteService from  '../services/anecdotes'
const anecdoteSlice = createSlice({
  name:'anecdote',
  initialState:[],
  reducers:{
    createAne(state, action){
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updated = action.payload;
      return state.map((anecdote) =>
        anecdote.id === updated.id ? updated : anecdote
      );
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdote(state,action){
      return action.payload
    }
  }
})



export const {createAne,updateAnecdote,appendAnecdote,setAnecdote} = anecdoteSlice.actions

export const addAnecdote = (content) => {
  return async(dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);

    dispatch(createAne(newAnecdote));
    dispatch(showNotification(`You added: "${content}"`, 5000));
  };
};

// Thunk for voting with notification
export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    console.log('Anecdote being voted:', anecdote); // Debug the anecdote object

    const updatedAnecdote = await anecdoteService.addVote(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(updateAnecdote(updatedAnecdote));
    dispatch(showNotification(`You voted for: "${anecdote.content}"`, 5000));
  };
};


export default anecdoteSlice.reducer