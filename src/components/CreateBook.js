import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import bookServices from "../services/book";
import { setNotification } from "../reducers/notificationReducer";
import "./CreateResources.style.css";

const CreateBook = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [file, setFile] = useState();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await bookServices.create(name, file);
      dispatch(setNotification("Livro criado com sucesso.", 2, false));
      setName("");
      setFile();
    } catch (error) {
      console.error(error);
      dispatch(
        setNotification("Ocorreu um erro ao tentar criar o livro", 2, true)
      );
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleCreateUser} className="Create-box">
        <h3 className="text-center mt-2">Adicionar um novo Livro</h3>
        <Form.Group>
          <Form.Label htmlFor="name">Nome</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={name}
            className="mt-1"
            onChange={(e) => setName(e.target.value)}
            onInvalid={(F) =>
              F.target.setCustomValidity("É necessário preencher esse campo.")
            }
            onInput={(F) => F.target.setCustomValidity("")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="file">Arquivo</Form.Label>
          <Form.Control
            required
            type="file"
            name="file"
            className="mt-1"
            onChange={(e) => setFile(e.target.files[0])}
            onInvalid={(F) =>
              F.target.setCustomValidity("É necessário preencher esse campo.")
            }
            onInput={(F) => F.target.setCustomValidity("")}
          />
        </Form.Group>
        <div>
          <Button type="submit" className="mt-2">
            Adicionar Livro
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateBook;
