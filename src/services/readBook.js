import axios from "axios";

const baseUrl = "http://localhost:3001/api/readbook";

const create = (userId, bookId) => {
  const request = axios.post(baseUrl, { userId, bookId });
  return request.then((response) => response.data);
};

const updateStatus = (userId, bookId) => {
  const request = axios.put(baseUrl, { userId, bookId });
  return request.then((response) => response.data);
};

const findUsersAndBooks = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { create, updateStatus, findUsersAndBooks };
