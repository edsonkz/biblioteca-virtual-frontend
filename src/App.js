import LoginForm from "./components/LoginForm";
import Book from "./components/Book";
import Notification from "./components/Notification";
import { saveUser } from "./reducers/userReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./components/UserHome";
import AdminHome from "./components/AdminHome";
import CreateAdminForm from "./components/CreateAdminForm";
import CreateResources from "./components/CreateResources";
import GraphPage from "./components/GraphPage";

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
          <Route
            path="/admin"
            element={
              user === null ? (
                <CreateAdminForm />
              ) : user.isAdmin ? (
                <AdminHome />
              ) : (
                <UserHome />
              )
            }
          />
          <Route
            path="/graph"
            element={
              user === null ? (
                <LoginForm />
              ) : user.isAdmin ? (
                <GraphPage />
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
