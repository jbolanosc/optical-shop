import React from "react";
import { Route } from "react-router-dom";
import PatientContainer from "../Patients/PatientContainer";
import ExamContainer from "../Exams/ExamContainer";
import DoctorContainer from "../Doctors/DoctorContainer";
import DiagnosticContainer from "../Diagnostics/DiagnosticContainer";

const MainContainer = () => (
  <div className="container">
    <Route path="/" exact component={PatientContainer} />
    <Route path="/patients" component={PatientContainer} />
    <Route path="/doctors" component={DoctorContainer} />
    <Route path="/exams" component={ExamContainer} />
    <Route path="/diagnostics" component={DiagnosticContainer} />
  </div>
);

export default MainContainer;
