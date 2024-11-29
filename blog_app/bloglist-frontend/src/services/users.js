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

export default { getAll };
