import "./Header.style.css";
import { logoutUser } from "../reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!user) {
    return null;
  }
  return (
    <div className="header-body">
      <div className="container">
        <ul className="header">
          <li className="nav">
            <Link className="linkTo" to="/">
              Início
            </Link>
          </li>
          {user.isAdmin ? (
            <li className="nav">
              <Link className="linkTo" to="/admin/create">
                Adicionar Usuários/ Livros
              </Link>
            </li>
          ) : (
            <></>
          )}

          <li className="nav">
            Seja bem vindo, {user.name}{" "}
            <Button onClick={handleLogout}>logout</Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
