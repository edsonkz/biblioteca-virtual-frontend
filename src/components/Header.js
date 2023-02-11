import "./Header.style.css";
import { logoutUser } from "../reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

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
    <div>
      <ul className="header">
        <li className="nav">
          Seja bem vindo, {user.name}{" "}
          <Button onClick={handleLogout}>logout</Button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
