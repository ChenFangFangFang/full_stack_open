import axios from "axios";
import user from "./userStorage";
const baseUrl = "/api/blog";

const getConfit = () => ({
  headers: { Authorization: `Bearer ${user.loadUser().token}` }
});
const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => {
      console.log("Fetched from API:", response.data); // Log the response
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching blogs:", error); // Handle and log any error
      return []; // Return an empty array on error
    });
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfit());
  return response.data;
};

const update = async (id, updatedBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog, getConfit());
  return request.then((response) => response.data);
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfit());
  return response.data;
};
const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog by ID (${id}):`, error);
    return null; // Return null on error
  }
};
export default { getAll, create, update, deleteBlog, getBlogById };
