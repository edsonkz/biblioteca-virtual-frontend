import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { useLocation, useNavigate, Link } from "react-router-dom";
import userServices from "../services/user";
import "./LoginForm.style.css";

const CreateAdminForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname !== "/admin") {
      navigate("/admin");
    }
  }, []);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await userServices.createAdmin(email, name, password);
      dispatch(
        setNotification(
          "Usuário administrador criado com sucesso, você será redirecionado para o login.",
          2,
          false
        )
      );
      setTimeout(() => {
        navigate("/");
      }, []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Auth-form-container">
      <h1 className="Auth-title">Biblioteca Virtual</h1>
      <Form onSubmit={handleCreateAdmin} className="Auth-form">
        <h3 className="Auth-form-title">Criar Administrador</h3>
        <Form.Group className="Auth-form-content">
          <p className="text-center mt-2 text-danger">
            Usuários administradores podem criar novos estudantes e adicionar
            livros, mas não podem ler livros.
          </p>
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
        <Form.Group className="Auth-form-content">
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
        <Form.Group className="Auth-form-content">
          <Form.Label htmlFor="password">Senha</Form.Label>
          <Form.Control
            required
            type="password"
            name="passwrod"
            value={password}
            className="mt-1"
            onChange={(e) => setPassword(e.target.value)}
            onInvalid={(F) =>
              F.target.setCustomValidity("É necessário preencher esse campo.")
            }
            onInput={(F) => F.target.setCustomValidity("")}
          />
        </Form.Group>
        <div className="Button-div">
          <Button type="submit" className="Button-submit">
            Criar
          </Button>
        </div>
        <p className="text-center mt-2 text-decoration-none">
          Já possui um usuário?{"  "}
          <Link to="/" className="Link-administrator">
            Clique Aqui
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default CreateAdminForm;
