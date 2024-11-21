import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
    axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote =>
    axios.post(baseUrl, newAnecdote).then(res => res.data)

export const updateAnecdote = async updatedAnecdote => {
    console.log('Sending PUT request:', updatedAnecdote);
    try {
        const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote);
        console.log('Server response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in PUT request:', error.response || error);
        throw error;
    }
};
