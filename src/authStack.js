import Login from './pages/login'
import Register from './pages/register'
import {React} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

function authStack() {
  return (
        <Router>
            <Switch>
                {/* if not authenticated and loggedout */}
                <Redirect exact from="/dashboard" to="/" />
                {/* authstack */}
                <Route exact path="/"  component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        </Router>
  );
}

export default authStack;

