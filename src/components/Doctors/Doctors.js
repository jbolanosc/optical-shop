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

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
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
    setDoctors(firebaseData);
  };

  const deleteDoctor = id => {
    const ref = firebase.firestore().collection("doctors");
    ref
      .doc(id)
      .delete()
      .then(() => {
        generateToast(false, "Doctor successfully deleted!.");
      })
      .catch(error => {
        generateToast(true, "Error removing doctor: ", error);
      });
  };

  const handleChange = name => event => {
    filterData(event.target.value);
  };

  const filterData = filter => {
    if (filter === "") {
      setDoctors(data);
    } else {
      setDoctors(data);
      const result = data.filter(doctor => doctor.firstname.includes(filter));
      setDoctors(result);
    }
  };

  useEffect(() => {
    const ref = firebase.firestore().collection("doctors");
    ref.onSnapshot(onCollectionUpdate);
  }, []);

  return (
    <React.Fragment>
      <h2>Doctors</h2>
      <div className="form-group w-25 float-right">
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
          {doctors.map(doctor => (
            <tr key={doctor.key}>
              <td>{doctor.firstname}</td>
              <td>{doctor.lastname}</td>
              <td>{doctor.IdNumber}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phone}</td>
              <td>
                <Link
                  to={`${url}/editDoctor/${doctor.key}`}
                  className="btn btn-success btn-md"
                >
                  Edit
                </Link>
              </td>
              <td>
                <button
                  onClick={() => deleteDoctor(doctor.key)}
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

export default Doctors;
