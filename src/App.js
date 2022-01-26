import {React, useState} from 'react'
import { firebaseApp } from "./firebase";
import AppStack from './appStack';
import AuthStack from './authStack';

function App() {
  // state to ckeck user is authenticated or not
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // toggle auth state on auth change
  const onAuthStateChanged = (user) =>{
    setIsAuthenticated(!!user)
  }

  firebaseApp.auth().onAuthStateChanged(onAuthStateChanged)
  return (            
    <div className="App">
      {/* if authenticated call app stack else auth stack */}
      {isAuthenticated ?<AppStack/>:<AuthStack/>}
    </div>
  );
}

export default App;
