import axios from "axios";
const baseUrl = "http://localhost:3001/api/users/login";

const login = (email, password) => {
  const request = axios.post(baseUrl, { email, password });
  return request.then((response) => response.data);
};

export default { login };
