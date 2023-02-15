import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, Form } from "react-router-dom";
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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offSet) => {
    if (numPages === pageNumber + offSet) {
      dispatch(setNotification("Livro finalizado com sucesso.", 2, false));
      dispatch(createReadBook(user.id, id));
    }
    if (!(numPages < pageNumber + offSet) && !(1 > pageNumber + offSet))
      setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  };

  const changePageDirect = (e) => {
    const newPageNumber = Number(e.target.value);
    if (newPageNumber <= 0) setPageNumber(1);
    else if (newPageNumber >= numPages) {
      setPageNumber(numPages);
      dispatch(setNotification("Livro finalizado com sucesso.", 2, false));
      dispatch(createReadBook(user.id, id));
    } else {
      setPageNumber(newPageNumber);
    }
  };

  const changePageBack = () => {
    changePage(-1);
  };

  const changePageNext = () => {
    changePage(+1);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      changePageNext();
    } else if (e.keyCode === 37) {
      changePageBack();
    }
  };

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
    getBooks();
  }, []);

  return (
    <div className="App">
      {book ? (
        <div className="App-header">
          <Link to="/">
            <Button className="return-Button">Retornar Para Biblioteca</Button>
          </Link>
          <div className="book-show" onKeyDown={handleKeyDown}>
            {pageNumber > 1 && (
              <Button onClick={changePageBack} className="button-arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </Button>
            )}
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

            {pageNumber < numPages && (
              <Button onClick={changePageNext} className="button-arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </Button>
            )}
          </div>

          <p className="pageNumber">
            <input
              className="page-selector"
              type="number"
              value={pageNumber}
              min="1"
              max={numPages}
              onChange={changePageDirect}
              step="1"
            />{" "}
            - {numPages}
          </p>
        </div>
      ) : (
        <h3>Livro Carregando...</h3>
      )}
    </div>
  );
};

export default Book;
