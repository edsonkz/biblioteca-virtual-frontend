import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import userServices from "../services/user";
import { setNotification } from "../reducers/notificationReducer";
import "./CreateResources.style.css";

const CreateUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [education, setEducation] = useState("");
  const [grade, setGrade] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await userServices.create(email, name, education, grade, password);
      dispatch(setNotification("Estudante criado com sucesso!", 2, false));
      setName("");
      setEmail("");
      setPassword("");
      setEducation("");
      setGrade("");
    } catch (error) {
      console.error(error);
      dispatch(setNotification("O email precisa ser único.", 2, true));
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleCreateUser} className="Create-box">
        <h3 className="text-center mt-2">Crie um Novo Estudante</h3>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={email}
            className="mt-1"
            onChange={(e) => setEmail(e.target.value)}
            onInvalid={(F) =>
              F.target.setCustomValidity("É necessário preencher esse campo.")
            }
            onInput={(F) => F.target.setCustomValidity("")}
          />
        </Form.Group>
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
          <Form.Label htmlFor="education">Educação</Form.Label>
          <Form.Control
            required
            type="text"
            name="education"
            value={education}
            className="mt-1"
            onChange={(e) => setEducation(e.target.value)}
            onInvalid={(F) =>
              F.target.setCustomValidity("É necessário preencher esse campo.")
            }
            onInput={(F) => F.target.setCustomValidity("")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="grade">Série</Form.Label>
          <Form.Control
            required
            type="text"
            name="grade"
            value={grade}
            className="mt-1"
            onChange={(e) => setGrade(e.target.value)}
            onInvalid={(F) =>
              F.target.setCustomValidity("É necessário preencher esse campo.")
            }
            onInput={(F) => F.target.setCustomValidity("")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Senha</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            value={password}
            className="mt-1"
            onChange={(e) => setPassword(e.target.value)}
            onInvalid={(F) =>
              F.target.setCustomValidity("É necessário preencher esse campo.")
            }
            onInput={(F) => F.target.setCustomValidity("")}
          />
        </Form.Group>
        <div>
          <Button type="submit" className="mt-2">
            Criar Estudante
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateUser;
