import axios from "axios";
const baseUrl = "http://localhost:3001/api/users/";

const create = (email, name, education, grade, password) => {
  const request = axios.post(baseUrl, {
    name,
    education,
    grade,
    email,
    password,
  });
  return request.then((response) => response.data);
};

export default { create };
