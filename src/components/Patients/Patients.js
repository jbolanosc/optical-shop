import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import firebase from "../Firebase/Firebase";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

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

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [data, setData] = useState([]);

  let { url } = useRouteMatch();
  const onCollectionUpdate = querySnapshot => {
    const firebaseData = [];
    querySnapshot.forEach(doc => {
      const { firstname, lastname, IdNumber, email, phone } = doc.data();
      firebaseData.push({
        key: doc.id,
        doc,
        firstname,
        lastname,
        IdNumber,
        email,
        phone
      });
    });
    setData(firebaseData);
    setPatients(firebaseData);
  };

  const deletePatient = id => {
    const ref = firebase.firestore().collection("patients");
    ref
      .doc(id)
      .delete()
      .then(() => {
        generateToast(false, "Patient successfully deleted!");
      })
      .catch(error => {
        generateToast(false, "Error removing document: " + error);
      });
  };

  const handleChange = name => event => {
    filterData(event.target.value);
  };

  const filterData = filter => {
    if (filter === "") {
      setPatients(data);
    } else {
      setPatients(data);
      const result = data.filter(patient => patient.firstname.includes(filter));
      setPatients(result);
    }
  };

  useEffect(() => {
    const ref = firebase.firestore().collection("patients");
    ref.onSnapshot(onCollectionUpdate);
  }, []);

  return (
    <React.Fragment>
      <div className="form-group w-25 m-2 float-right">
        <input
          placeholder="Filter By FirstName"
          className="form-control"
          type="text"
          onChange={handleChange("filter")}
        />
      </div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">ID number</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.key}>
              <td>{patient.firstname}</td>
              <td>{patient.lastname}</td>
              <td>{patient.IdNumber}</td>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              <td>
                <Link
                  to={`${url}/editPatient/${patient.key}`}
                  className="btn btn-success btn-md"
                >
                  Edit
                </Link>
              </td>
              <td>
                <button
                  onClick={() => deletePatient(patient.key)}
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

export default Patients;
