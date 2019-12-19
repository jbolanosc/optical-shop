import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import firebase from "../Firebase/Firebase";
import Loading from "../layout/Loader";

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

const EditDiagnostic = props => {
  const [isLoading, setIsLoading] = useState("1");
  const [doctors, setDoctors] = useState([]);
  const [key, setkey] = useState("");
  const [diagnostic, setDiagnostic] = useState({
    doctor: "",
    rSPH: "",
    rCYL: "",
    rEJE: "",
    rDP: "",
    rADD: "",
    rPRISMA: "",
    rBASE: "",
    finalDiagnostic: "",
    lSPH: "",
    lCYL: "",
    lEJE: "",
    lDP: "",
    lADD: "",
    lPRISMA: "",
    lBASE: "",
    patientInfo: ""
  });

  const saveDiagnostic = e => {
    e.preventDefault();
    const {
      patientInfo,
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
    const updateRef = firebase
      .firestore()
      .collection("diagnostics")
      .doc(key);

    updateRef
      .set({
        patientInfo,
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
      })
      .then(docRef => {
        generateToast(false, "Diagnostic updated.");
        props.history.push("/diagnostics");
      });
  };

  const handleChange = name => event => {
    console.log(event.target.value);
    setDiagnostic({
      ...diagnostic, [name]: event.target.value
    });
  };

  useEffect(() => {
    const refDoctors = firebase.firestore().collection("doctors");
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

    const loadDiagnostic = () => {
      const ref = firebase
        .firestore()
        .collection("diagnostics")
        .doc(props.match.params.id);
      ref.get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          setkey(props.match.params.id);
          setDiagnostic(data);
        } else {
          generateToast(true, "No Diagnostic with given ID.");
          props.history.push("/diagnostics");
        }
      });
    };

    const loading = () => {
      setTimeout(() => {
        setIsLoading("");
      }, 1200);
    };

    loadDiagnostic();
    refDoctors.onSnapshot(getDoctors);
    loading();
  }, [props.history, props.match.params.id]);

  return (
    <div className="container">
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="container-fluid">
          <h2 className="m-1">Edit Diagnostic</h2>
          <form onSubmit={e => saveDiagnostic(e)}>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <h4>Patient Info</h4>
                    <div className="form-group">
                      <label>Patient</label>
                      <input
                        className="form-control"
                        type="text"
                        value={diagnostic.patientInfo}
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
                        type="date"
                        required
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
                            name="rSPH"
                            value={diagnostic.rSPH}
                            onChange={handleChange("rSPH")}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>CYL</label>
                          <input
                            name="rCYL"
                            type="number"
                            className="form-control"
                            value={diagnostic.rCYL}
                            onChange={handleChange("rCYL")}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>EJE</label>
                          <input
                            type="number"
                            name="rEJE"
                            value={diagnostic.rEJE}
                            onChange={handleChange("rEJE")}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>DP</label>
                          <input
                            type="number"
                            value={diagnostic.rDP}
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
                            value={diagnostic.rADD}
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
                            value={diagnostic.rPRISMA}
                            onChange={handleChange("rPRISMA")}
                            className="form-control"
                            name="rPRISMA"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>BASE</label>
                          <input
                            value={diagnostic.rBASE}
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
                            value={diagnostic.lSPH}
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
                            value={diagnostic.lCYL}
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
                            value={diagnostic.lEJE}
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
                            value={diagnostic.lDP}
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
                            value={diagnostic.lADD}
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
                            value={diagnostic.lPRISMA}
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
                            value={diagnostic.lBASE}
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
                    value={diagnostic.finalDiagnostic}
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
      )}
    </div>
  );
};

export default EditDiagnostic;
