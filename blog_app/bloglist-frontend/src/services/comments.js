import axios from "axios";
const baseUrl = "/api/comments";
const create = async (blogId, contentObject) => {
  const response = await axios.post(`${baseUrl}/${blogId}`, contentObject);
  return response.data;
};
export default { create };
