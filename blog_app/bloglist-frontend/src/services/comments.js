import axios from "axios";
const baseUrl = "/api/comments";
const create = async (contentObject) => {
  const response = await axios.post(baseUrl, contentObject);
  return response.data;
};
export default { create };
