import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blog'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog)
  const response = await request
  return response.data
}


const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("Delete request config:", config) // Log to verify token

  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data

}
export default { getAll, create, update, setToken, deleteBlog }
