import {React, useState, useEffect} from 'react'
import { firebaseApp } from "./firebase";
import AppStack from './appStack';
import AuthStack from './authStack';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const onAuthStateChanged = (user) =>{
    setIsAuthenticated(!!user)
  }

  firebaseApp.auth().onAuthStateChanged(onAuthStateChanged)
  return (            
    <div className="App">
      {isAuthenticated ?<AppStack/>:<AuthStack/>}
    </div>
  );
}

export default App;
