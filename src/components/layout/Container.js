import React from "react";
import { Route } from "react-router-dom";

import Landing  from "./Landing";
import PatientContainer from "../Patients/PatientContainer";
import ExamContainer from "../Exams/ExamContainer";
import DoctorContainer from "../Doctors/DoctorContainer";
import DiagnosticContainer from "../Diagnostics/DiagnosticContainer";

const MainContainer = () => (
  <div className="container-fluid h-100 w-100 p-0">
    <Route path="/" exact component={Landing} />
    <Route path="/patients" component={PatientContainer} />
    <Route path="/doctors" component={DoctorContainer} />
    <Route path="/exams" component={ExamContainer} />
    <Route path="/diagnostics" component={DiagnosticContainer} />
  </div>
);

export default MainContainer;
