import { useDispatch } from "react-redux";
import readBookServices from "../services/readBook";
import { useEffect, useState } from "react";
import _ from "lodash";
import moment from "moment/moment";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

import Header from "./Header";
import "./Table.style.css";

const GraphPage = () => {
  const dispatch = useDispatch();
  const [datasets, setDatasets] = useState(null);

  const dayName = (item) => moment(item.lastRead, "YYYY-MM-DD").format("DD");

  useEffect(() => {
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
    getBookInfo();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div style={{ marginTop: "1rem" }}>
        <h3>Gráficos de Livros Lidos por Dia</h3>
        {datasets !== null ? (
          <div className="graph">
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

export default GraphPage;
