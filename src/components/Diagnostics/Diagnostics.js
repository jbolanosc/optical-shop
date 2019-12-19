import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import firebase from "../Firebase/Firebase";

const generateToast = (err, msg) => {
  const red =
    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(215,14,14,1) 99%, rgba(0,212,255,1) 100%)";
  const green =
    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(139,213,86,1) 0%)";
  if (err) {
    Toastify({
      text: msg,
      duration: 5000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      backgroundColor: red,
      className: "info",
      stopOnFocus: true // Prevents dismissing of toast on hover
    }).showToast();
  } else {
    Toastify({
      text: msg,
      duration: 5000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      backgroundColor: green,
      className: "info",
      stopOnFocus: true // Prevents dismissing of toast on hover
    }).showToast();
  }
};

const Diagnostics = () => {
  const [diagnostics, setDiagnostics] = useState([]);
  const [data, setData] = useState([]);

  let { url } = useRouteMatch();

  const deleteDiagnostic = id => {
    const ref = firebase.firestore().collection("diagnostics");
    ref
      .doc(id)
      .delete()
      .then(() => {
        generateToast(false, "Diagnostic deleted.");
      })
      .catch(error => {
        generateToast(true, "Error removing document: ", error);
      });
  };

  const handleChange = name => event => {
    filterData(event.target.value);
  };

  const filterData = filter => {
    if (filter === "") {
      setDiagnostics(data);
    } else {
      setDiagnostics(data);
      const result = data.filter(diagnostic => diagnostic.patientInfo.includes(filter));
      setDiagnostics(result);
    }
  };

  useEffect(() => {
    const ref = firebase.firestore().collection("diagnostics");
    const onCollectionUpdate = querySnapshot => {
      const firebaseData = [];
      querySnapshot.forEach(doc => {
        const {
          doctor,
          patientInfo,
          finalDiagnostic,
          date,
          rSPH,
          rCYL,
          rEJE,
          rDP,
          rADD,
          rPRiSMA,
          rBASE,
          lSPH,
          lCYL,
          lEJE,
          lDP,
          lADD,
          lPRiSMA,
          lBASE
        } = doc.data();

        firebaseData.push({
          key: doc.id,
          doctor,
          patientInfo,
          finalDiagnostic,
          date,
          rSPH,
          rCYL,
          rEJE,
          rDP,
          rADD,
          rPRiSMA,
          rBASE,
          lSPH,
          lCYL,
          lEJE,
          lDP,
          lADD,
          lPRiSMA,
          lBASE
        });
      });
      setData(firebaseData);
      setDiagnostics(firebaseData);
    };
    ref.onSnapshot(onCollectionUpdate);
  }, []);

  return (
    <React.Fragment>
      <div className="form-group w-25 m-2 float-right">
        <input
          placeholder="Filter By Patient Name"
          className="form-control"
          type="text"
          onChange={handleChange("filter")}
        />
      </div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Patient</th>
            <th scope="col">Doctor</th>
            <th scope="col">Diagnostic</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {diagnostics.map(diagnostic => (
            <tr key={diagnostic.key}>
              <td>{diagnostic.patientInfo}</td>
              <td>{diagnostic.doctor}</td>
              <td>{diagnostic.finalDiagnostic}</td>
              <td>{diagnostic.date}</td>
              <td>
                <Link
                  to={`${url}/editDiagnostic/${diagnostic.key}`}
                  className="btn btn-success btn-md"
                >
                  Edit
                </Link>
              </td>
              <td>
                <Link
                  to={`${url}/completeDiagnostic/${diagnostic.key}`}
                  className="btn btn-info btn-md"
                >
                  View Complete
                </Link>
              </td>
              <td>
                <button
                  onClick={() => deleteDiagnostic(diagnostic.key)}
                  className="btn btn-danger btn-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Diagnostics;
