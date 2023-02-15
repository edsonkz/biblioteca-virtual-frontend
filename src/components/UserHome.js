import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useEffect } from "react";
import Header from "./Header";

import { initializeBooks } from "../reducers/booksReducer";

import "./UserHome.style.css";

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
        <h3 className="mt-2 mb-2">Acervo de Livros</h3>
        <div className="books">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className="book">
                <Link to={`/books/${book.id}`} className="book-area">
                  <Image
                    src={process.env.PUBLIC_URL + "book-cover-placeholder.png"}
                    style={{ height: "270px", width: "170px" }}
                  />
                  <p className="book-title">{book.name}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>Nenhum livro encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
