import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../reducers/userReducer";
import "./LoginForm.style.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname !== "/") {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div className="Auth-form-container">
      <h1 className="Auth-title">Biblioteca Virtual</h1>
      <Form onSubmit={handleLogin} className="Auth-form">
        <h3 className="Auth-form-title">Entrar</h3>
        <Form.Group className="Auth-form-content">
          <p className="text-center mt-2">
            Seja bem vindo(a) a Biblioteca Virtual
          </p>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={email}
            className="mt-1"
            onChange={(e) => setEmail(e.target.value)}
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
          />
        </Form.Group>
        <div className="Button-div">
          <Button type="submit" className="Button-submit">
            Entrar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
