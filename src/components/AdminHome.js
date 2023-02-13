import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import readBookServices from "../services/readBook";
import { useEffect, useState } from "react";
import _ from "lodash";
import moment from "moment/moment";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

import Header from "./Header";

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
        <div key={key}>
          <h4>{key}</h4>
          {students[key].map((book) => (
            <div key={book.bookId}>
              <p>
                <strong>{book.bookname}</strong> -{" "}
                {book.finished ? "leitura finalizada" : "leitura em andamento"}
              </p>
            </div>
          ))}
        </div>
      );
    });

  return (
    <div>
      <Header />
      <div>
        <h3>Alunos</h3>
        {students !== null ? (
          studentsRendered()
        ) : (
          <p>Nenhum aluno encontrado.</p>
        )}
      </div>
      <div>
        <h3>Gráficos de Livros Lidos por Dia</h3>
        {datasets !== null ? (
          <div className="container">
            <Bar
              data={datasets}
              options={{
                title: {
                  display: true,
                  text: "Livros lidos por Dia",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        ) : (
          <div>
            <p>Sem informação suficiente para gerar um gráfico.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
