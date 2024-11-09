import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blog'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
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
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.status === 204
  } catch (error) {
    console.error('Failed to delete blog:', error)
    throw error
  }
}

export default { getAll, create, update, setToken, deleteBlog }
