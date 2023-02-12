import { useDispatch, useSelector } from "react-redux";
import readBookServices from "../services/readBook";
import { useEffect, useState } from "react";
import _ from "lodash";
import Header from "./Header";

const AdminHome = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const getStudents = async () => {
      const data = await readBookServices.findUsersAndBooks();
      const studentBooks = _.mapValues(_.groupBy(data, "username"), (clist) =>
        clist.map((student) => _.omit(student, "username"))
      );
      setStudents(studentBooks);
      console.log(studentBooks);
    };

    getStudents();
  }, [dispatch]);

  const studentsRendered = () =>
    Object.keys(students).map((key) => {
      return (
        <div key={key}>
          <h4>{key}</h4>
          {students[key].map((book) => (
            <div key={book.bookId}>
              <p>{book.bookname}</p>
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
    </div>
  );
};

export default AdminHome;
