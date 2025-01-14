import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { GlobalContext } from "../../context/store";

/**
 * Chart in the detail-overlay for a single hex
 */
const Chart = ({ hex }) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  // ChartJS Options
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: "#1F3954",
        },
        ticks: {
          display: false, //this will remove only the label
        },
      },
      y: {
        grid: {
          color: "#1F3954",
        },
        ticks: {
          display: false, //this will remove only the label
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Historical Data",
      },
    },
  };

  // Chart JS Data
  const data = {
    labels,
    datasets: [
      {
        label: "AGENCY",
        data: values,
        borderColor: "white",
      },
    ],
  };

  useEffect(() => {
    const l = [];
    const v = [];

    // Get history of a single hex from API and convert to a readable date-string.
    axios.get(process.env.GATSBY_DATAPLATFORM_URL + hex).then((res) => {
      Object.keys(res.data.data["HCHO"]).map((el) => {
        const date = new Date(el);
        l.push(date.toLocaleDateString("en-US"));
        v.push(res.data.data["HCHO"][el]);
      });
      if (
        new Date(Object.keys(res.data.data["HCHO"]).pop()).getTime() <=
        new Date().getTime() -
          parseInt(process.env.GATSBY_DATA_MAX_AGE) * 24 * 60 * 60 * 1000
      ) {
        // set hex as outdated
        dispatch({
          type: "SET_HEX_OUTDATED",
          payload: true,
        });
      } else {
        // not outdated
        dispatch({
          type: "SET_HEX_OUTDATED",
          payload: false,
        });
      }
      setLabels(l);
      setValues(v);
    });
  }, [state.chosenHex]);

  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            id: 1,
            label: "",
            data: values,
            borderColor: "white",
          },
        ],
      }}
      options={options}
    />
  );
};

export default Chart;
