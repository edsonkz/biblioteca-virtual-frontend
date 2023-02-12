import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";

import bookServices from "../services/book";
import readBookServices from "../services/readBook";
import { setNotification } from "../reducers/notificationReducer";
import { createReadBook } from "../reducers/booksReducer";

import "./Book.style.css";
import { Button } from "react-bootstrap";

const Book = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const id = useParams().id;
  const [book, setBook] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet) {
    if (numPages === pageNumber + offSet) {
      dispatch(setNotification("Livro finalizado com sucesso.", 2, false));
      dispatch(createReadBook(user.id, id));
    }
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(+1);
  }

  useEffect(() => {
    const getBooks = async () => {
      try {
        const book = await bookServices.getOne(id);
        setBook(book);

        await readBookServices.create(user.id, id);
      } catch (error) {
        dispatch(
          setNotification(
            "Livro não encontrado. Você será direcionada para a biblioteca...",
            2,
            true
          )
        );
        navigate("/");
      }
    };
    if (user !== null && user.isAdmin === false) {
      getBooks();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      {book ? (
        <div className="App-header">
          <Link to="/">
            <Button className="return-Button">Retornar Para Biblioteca</Button>
          </Link>
          <Document
            file={`http://localhost:3001/api/books/${book.filename}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              height={800}
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
          <p className="pageNumber">
            {pageNumber} - {numPages}
          </p>
          <div className="Button-select">
            {pageNumber > 1 && (
              <Button onClick={changePageBack}>Página Anterior</Button>
            )}
            {pageNumber < numPages && (
              <Button onClick={changePageNext}>Próxima Página</Button>
            )}
          </div>
        </div>
      ) : (
        <h3>Livro Carregando...</h3>
      )}
    </div>
  );
};

export default Book;
