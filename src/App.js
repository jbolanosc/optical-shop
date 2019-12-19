import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import MainContainer from "./components/layout/Container";

function App() {
  return (
    <Router>
      <Switch>
        <Fragment>
          <div className="container-fluid w-100">
            <div className="row">
              <div className="col-md-1 bg-dark p-0">
                <NavBar />
              </div>
              <div className="col-md-11 p-0">
                <MainContainer />
              </div>
            </div>
          </div>
        </Fragment>
      </Switch>
    </Router>
  );
}

export default App;
