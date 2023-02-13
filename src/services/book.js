import axios from "axios";

const baseUrl = "http://localhost:3001/api/books";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getOne = (id) => {
  const request = axios.get(baseUrl + "/" + id);
  return request.then((response) => response.data);
};

const create = (name, file) => {
  const request = axios.post(
    baseUrl,
    { name, book: file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return request.then((response) => response.data);
};

export default { getAll, getOne, create };
