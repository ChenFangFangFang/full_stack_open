import axios from "axios";
const baseUrl = "/api/users";
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
const getBlog = async ({ userId }) => {
  try {
    const response = await axios.get(`${baseUrl}/${userId}`);
    console.log("Fetched from API:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blogs for user ${userId}:`, error);
    return [];
  }
};
const getById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user by ID (${id}):`, error);
    return null; // Return null on error
  }
};
export default { getAll, getBlog, getById };
