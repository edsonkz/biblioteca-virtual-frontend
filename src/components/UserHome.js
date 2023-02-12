import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";

import { initializeBooks } from "../reducers/booksReducer";

const UserHome = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(initializeBooks());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div>
        <h3>Acervo de Livros</h3>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id}>
              <Link to={`/books/${book.id}`}>{book.name}</Link>
            </div>
          ))
        ) : (
          <p>Nenhum livro encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default UserHome;
