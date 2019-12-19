import React, { useEffect, useState } from "react";

import firebase from "../Firebase/Firebase";
import Loading from "../layout/Loader";


const CompleteDiagnostic = props => {
  const [isLoading, setIsLoading] = useState("1");
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



  useEffect(() => {
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
          <h2 className="m-1">Diagnostic</h2>
          <form>
            <div className="row">
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
                            className="form-control"
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>CYL</label>
                          <input
                            name="rCYL"
                            type="number"
                            className="form-control"
                            value={diagnostic.rCYL}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>EJE</label>
                          <input
                            type="number"
                            name="rEJE"
                            value={diagnostic.rEJE}
                            className="form-control"
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>DP</label>
                          <input
                            type="number"
                            value={diagnostic.rDP}
                            className="form-control"
                            name="rDP"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>ADD</label>
                          <input
                            type="number"
                            value={diagnostic.rADD}
                            className="form-control"
                            name="rADD"
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>PRiSMA</label>
                          <input
                            type="number"
                            value={diagnostic.rPRISMA}
                            className="form-control"
                            name="rPRISMA"
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>BASE</label>
                          <input
                            value={diagnostic.rBASE}
                            type="number"
                            className="form-control"
                            name="rBASE"
                            readOnly
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
                            className="form-control"
                            name="lSPH"
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>CYL</label>
                          <input
                            value={diagnostic.lCYL}
                            type="number"
                            className="form-control"
                            name="lCYL"
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>EJE</label>
                          <input
                            value={diagnostic.lEJE}
                            type="number"
                            className="form-control"
                            name="lEJE"
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>DP</label>
                          <input
                            value={diagnostic.lDP}
                            type="number"
                            className="form-control"
                            name="lDP"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>ADD</label>
                          <input
                            value={diagnostic.lADD}
                            type="number"
                            className="form-control"
                            name="lADD"
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>PRiSMA</label>
                          <input
                            value={diagnostic.lPRISMA}
                            type="number"
                            className="form-control"
                            name="lPRISMA"
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>BASE</label>
                          <input
                            value={diagnostic.lBASE}
                            type="number"
                            className="form-control"
                            name="lBASE"
                            readOnly
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
                    name="finalDiagnostic"
                    className="form-control"
                    rows="3"
                    readOnly
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

export default CompleteDiagnostic;