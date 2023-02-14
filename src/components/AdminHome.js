import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import readBookServices from "../services/readBook";
import { useEffect, useState } from "react";
import _ from "lodash";
import moment from "moment/moment";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Table } from "react-bootstrap";

import Header from "./Header";

import "./Table.style.css";

const AdminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [students, setStudents] = useState(null);
  const [datasets, setDatasets] = useState(null);

  const dayName = (item) => moment(item.lastRead, "YYYY-MM-DD").format("DD");

  useEffect(() => {
    const getStudents = async () => {
      const data = await readBookServices.findUsersAndBooks();

      const studentBooks = _.mapValues(_.groupBy(data, "username"), (clist) =>
        clist.map((student) => _.omit(student, "username"))
      );
      setStudents(studentBooks);
    };

    const getBookInfo = async () => {
      const data = await readBookServices.findAll();
      const readByDay = _.groupBy(data, dayName);
      const labels = Object.keys(readByDay);
      const dataToDataSet = Object.keys(readByDay).map(
        (key) => readByDay[key].length
      );
      const toDataSet = {
        labels,
        datasets: [
          {
            label: "Livros Lidos por Dia",
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: dataToDataSet,
          },
        ],
      };
      setDatasets(toDataSet);
    };

    if (location.pathname.includes("/books")) {
      navigate("/");
    } else {
      getStudents();
      getBookInfo();
    }
  }, [dispatch, location.pathname]);

  const studentsRendered = () =>
    Object.keys(students).map((key) => {
      return (
        <div key={key} className="Student-info">
          <h4 className="Student-name">{key}</h4>
          <Table striped>
            <thead>
              <tr>
                <th>Id Livro</th>
                <th>Livros</th>
                <th>Progresso</th>
              </tr>
            </thead>
            <tbody>
              {students[key].map((book) => (
                <tr key={book.bookId}>
                  <td>{book.bookId}</td>
                  <td>{book.bookname}</td>
                  <td>{book.finished ? "finalizado" : "em andamento"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    });

  return (
    <div>
      <Header />
      <div style={{ marginTop: "1rem" }}>
        <h3>Livros lidos por Alunos</h3>
        {students !== null ? (
          studentsRendered()
        ) : (
          <p>Nenhum aluno encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
