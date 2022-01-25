import Login from './pages/login'
import Register from './pages/register'
import {React} from 'react'
import {BrowserRouter as Router,  Route, Switch } from "react-router-dom";

function authStack() {
  return (
        <Router>
            <Switch >
                <Route exact path="/"  component={Login} />
                {/* <Route path="/edit_profile" component={EditInfo} /> */}
            </Switch>
        </Router>
  );
}

export default authStack;

