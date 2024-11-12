import axios from 'axios'
import user from './userStorage'
const baseUrl = '/api/blog'
let token = null

const getConfit = () => ({
  headers: { Authorization: `Bearer ${user.loadUser().token}` }
})
const getAll =  () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfit())
  return response.data
}

const update = async (id, updatedBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog,getConfit())
  return request.then(response => response.data)
}


const deleteBlog = async (id) => {

  const response = await axios.delete(`${baseUrl}/${id}`, getConfit())
  return response.data

}

export default { getAll, create, update, deleteBlog }
