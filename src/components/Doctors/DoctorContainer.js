import React from "react";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";

import DoctorForm from "./DoctorForm";
import Doctors from "./Doctors";
import EditDoctor from "./EditDoctor";

const DoctorContainer = () => {
  let { path, url } = useRouteMatch();

  return (
    <div className="container">
      <Link to={`${url}/addDoctor`} className="btn btn-default m-1">
        Add doctor
      </Link>
      <Link to={`${url}`} className="btn btn-info m-1">
        VIew doctors
      </Link>
      <Switch>
        <Route path={`${path}`} exact component={Doctors} />
        <Route path={`${path}/addDoctor`} component={DoctorForm} />
        <Route path={`${path}/editDoctor/:id`} component={EditDoctor} />
      </Switch>
    </div>
  );
};

export default DoctorContainer;
