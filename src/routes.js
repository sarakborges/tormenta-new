import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ROUTES } from "consts";

import Weapons from "Containers/Weapons";
import Error from "Containers/Error";

const Routes = () => {
  return (
    <Router>
      <div className="app-content">
        <Switch>
          <Route path={ROUTES.WEAPONS.url} component={Weapons} exact />
          <Route path="*" component={Error} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
