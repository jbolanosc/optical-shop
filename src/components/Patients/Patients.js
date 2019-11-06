import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import firebase from "../Firebase/Firebase";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  let { url } = useRouteMatch();

  const ref = firebase.firestore().collection("patients");

  const onCollectionUpdate = querySnapshot => {
    const data = [];
    querySnapshot.forEach(doc => {
      const { firstname, lastname, IdNumber, email, phone } = doc.data();
      data.push({
        key: doc.id,
        doc,
        firstname,
        lastname,
        IdNumber,
        email,
        phone
      });
    });
    setPatients(data);
  };

  const deletePatient = id => {
    console.log(id);
    alert("deleting");
      ref
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      }); 
  };

  useEffect(() => {
    ref.onSnapshot(onCollectionUpdate);
  }, []);

  return (
    <React.Fragment>
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
                <button onClick={() => deletePatient(patient.key)} className="btn btn-danger btn-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Patients;
