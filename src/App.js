import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { saveUser } from "./reducers/userReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserHome from "./components/UserHome";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user);
      dispatch(saveUser(user));
    }
  }, []);

  return (
    <div className="App">
      <Notification />
      <Router>
        <Routes>
          <Route
            path="/"
            element={user === null ? <LoginForm /> : <UserHome />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
