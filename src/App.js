import LoginForm from "./components/LoginForm";
import Book from "./components/Book";
import Notification from "./components/Notification";
import { saveUser } from "./reducers/userReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./components/UserHome";
import AdminHome from "./components/AdminHome";
import CreateResources from "./components/CreateResources";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
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
            element={
              user === null ? (
                <LoginForm />
              ) : user.isAdmin ? (
                <AdminHome />
              ) : (
                <UserHome />
              )
            }
          />
          <Route
            path="/books/:id"
            element={
              user === null ? (
                <LoginForm />
              ) : user.isAdmin ? (
                <AdminHome />
              ) : (
                <Book />
              )
            }
          />
          <Route
            path="/admin/create"
            element={
              user === null ? (
                <LoginForm />
              ) : user.isAdmin ? (
                <CreateResources />
              ) : (
                <UserHome />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
