import Dashboard from './pages/dashboard'
import Profile from './pages/profile'
import {React} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

function appStack() {
  return (
        <Router>
            <Switch >
                {/* if authenticated  */}
                <Redirect exact from="/" to="dashboard" />
                {/* redirect to dashboard after successfull registration */}
                <Redirect exact from="/register" to="dashboard" />
                <Route path="/dashboard"  component={Dashboard} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </Router>
  );
}

export default appStack;

