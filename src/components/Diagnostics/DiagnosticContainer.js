import React from "react";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";

import DiagnosticForm from "./DiagnosticForm";
import Diagnostics from "./Diagnostics";
import EditDiagnostic from "./EditDiagnostic";
import CompleteDiagnostic from "./CompleteDiagnostic"

export default function DiagnosticContainer() {
  let { path, url } = useRouteMatch();

  return (
    <div className="container">
      <Link to={`${url}/addDiagnostic`} className="btn btn-default m-1">
        New Diagnostic
      </Link>
      <Link to={`${url}`} className="btn btn-info m-1">
        View Diagnostics
      </Link>
      <Switch>
        <Route path={`${path}`} exact component={Diagnostics} />
        <Route path={`${path}/addDiagnostic`} component={DiagnosticForm} />
        <Route path={`${path}/editDiagnostic/:id`} component={EditDiagnostic} />
        <Route path={`${path}/completeDiagnostic/:id`} component={CompleteDiagnostic} />
      </Switch>
    </div>
  );
}