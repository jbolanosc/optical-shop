import React, { useState, useEffect } from "react";
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

const DiagnosticForm = props => {
  const [doctors, setDoctors] = useState([]);
  const [patient, setPatient] = useState({
    firstname: "",
    lastname: ""
  });
  const [diagnostic, setDiagnostic] = useState({});

  const ref = firebase.firestore().collection("diagnostics");
  const refPatient = firebase.firestore().collection("patients");

  const getDoctors = querySnapshot => {
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
    setDoctors(data);
  };

  const getPatientInfo = () => {
    if (!patient.IdNumber) {
      return;
    } else {
      refPatient
        .where("IdNumber", "==", patient.IdNumber)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            generateToast(true, "No document with given ID.");
            return;
          }
          generateToast(false, "Patient loaded.");
          snapshot.forEach(doc => {
            setPatient(doc.data());
          });
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    }
  };

  const handlePatient = name => event => {
    setPatient({ ...patient, [name]: event.target.value });
  };

  const handleChange = name => event => {
    setDiagnostic({ ...diagnostic, [name]: event.target.value });
  };

  const saveDiagnostic = e => {
    e.preventDefault();
    const {
      doctor,
      rSPH,
      rCYL,
      rEJE,
      rDP,
      rADD,
      rPRISMA,
      rBASE,
      finalDiagnostic,
      date,
      lSPH,
      lCYL,
      lEJE,
      lDP,
      lADD,
      lPRISMA,
      lBASE
    } = diagnostic;
    const patientInfo = patient.firstname + " " + patient.lastname;

    ref
      .add({
        doctor,
        patientInfo,
        finalDiagnostic,
        date,
        rSPH,
        rCYL,
        rEJE,
        rDP,
        rADD,
        rPRISMA,
        rBASE,
        lSPH,
        lCYL,
        lEJE,
        lDP,
        lADD,
        lPRISMA,
        lBASE
      })
      .then(docRef => {
        generateToast(false, "Diagnostic saved.");
        props.history.push("/diagnostics");
      })
      .catch(error => {
        generateToast(true, "Error adding document: ", error);
      });
  };

  useEffect(() => {
    const refDoctors = firebase.firestore().collection("doctors");
    refDoctors.onSnapshot(getDoctors);
  }, []);

  return (
    <div className="container-fluid">
      <h2 className="m-1">Diagnostic Registration</h2>
      <form onSubmit={e => saveDiagnostic(e)}>
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <h4>Patient Info</h4>
                <div className="form-group">
                  <label>Patient ID</label>
                  <input
                    onChange={handlePatient("IdNumber")}
                    className="form-control"
                    type="text"
                    required
                  />
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => getPatientInfo()}
                  >
                    Get Patient
                  </button>
                </div>
                <div className="form-group">
                  <label>Patient firstname</label>
                  <input
                    className="form-control"
                    type="text"
                    value={patient.firstname}
                    onChange={handleChange("patientFirstname")}
                    required
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Patient lastname</label>
                  <input
                    className="form-control"
                    type="text"
                    value={patient.lastname}
                    onChange={handleChange("patientLastname")}
                    required
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h4>Doctor</h4>
                <div className="form-group">
                  <label>Select Doctor</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={handleChange("doctor")}
                  >
                    <option defaultValue>Select a Doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor.key}>
                        {doctor.firstname} {doctor.lastname}
                      </option>
                    ))}
                  </select>
                </div>
                <h4>Dates</h4>
                <div className="form-group">
                  <label>Diagnostic Date</label>
                  <input
                    className="form-control"
                    onChange={handleChange("date")}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-info" type="submit">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <h4>Right</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>SPH</label>
                      <input
                        type="number"
                        onChange={handleChange("rSPH")}
                        className="form-control"
                        name="rSPH"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CYL</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={handleChange("rCYL")}
                        name="rCYL"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>EJE</label>
                      <input
                        type="number"
                        onChange={handleChange("rEJE")}
                        className="form-control"
                        name="rEJE"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>DP</label>
                      <input
                        type="number"
                        onChange={handleChange("rDP")}
                        className="form-control"
                        name="rDP"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>ADD</label>
                      <input
                        type="number"
                        onChange={handleChange("rADD")}
                        className="form-control"
                        name="rADD"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>PRiSMA</label>
                      <input
                        type="number"
                        onChange={handleChange("rPRISMA")}
                        className="form-control"
                        name="rPRISMA"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>BASE</label>
                      <input
                        type="number"
                        onChange={handleChange("rBASE")}
                        className="form-control"
                        name="rBASE"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <h4>Left</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>SPH</label>
                      <input
                        type="number"
                        onChange={handleChange("lSPH")}
                        className="form-control"
                        name="lSPH"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CYL</label>
                      <input
                        type="number"
                        onChange={handleChange("lCYL")}
                        className="form-control"
                        name="lCYL"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>EJE</label>
                      <input
                        type="number"
                        onChange={handleChange("lEJE")}
                        className="form-control"
                        name="lEJE"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>DP</label>
                      <input
                        type="number"
                        onChange={handleChange("lDP")}
                        className="form-control"
                        name="lDP"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>ADD</label>
                      <input
                        type="number"
                        onChange={handleChange("lADD")}
                        className="form-control"
                        name="lADD"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>PRiSMA</label>
                      <input
                        type="number"
                        onChange={handleChange("lPRISMA")}
                        className="form-control"
                        name="lPRISMA"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>BASE</label>
                      <input
                        type="number"
                        onChange={handleChange("lBASE")}
                        className="form-control"
                        name="lBASE"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Final diagnostic</label>
              <textarea
                onChange={handleChange("finalDiagnostic")}
                name="finalDiagnostic"
                className="form-control"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DiagnosticForm;
