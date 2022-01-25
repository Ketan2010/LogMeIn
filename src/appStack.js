import Update from './pages/update'
import profile from './pages/profile'
import {React} from 'react'
import {BrowserRouter as Router,  Route, Switch } from "react-router-dom";

function appStack() {
  return (
        <Router>
            <Switch >
                <Route exact path="/"  component={Update} />
                {/* <Route path="/edit_profile" component={EditInfo} /> */}
            </Switch>
        </Router>
  );
}

export default appStack;

