import {React, useEffect, useState} from 'react'
import '../stylesheets/login.css';
import { firebaseApp } from "../firebase";


function Dashboard() {
  // get current user
  const user = firebaseApp.auth().currentUser;
  const [username, setUsername] = useState("")

  // to get name of current user
  useEffect(() => {
    firebaseApp.database()
    .ref("users/")
    .orderByChild("uid")
    .equalTo(user.uid)
    .once('value')
    .then(snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach((child) => {
                setUsername(child.val().name)
            }); 
          } 
    });
  }, [])

  // redirect to profile page on click
  const profile = () =>{
    window.location.href = "/profile"
  }

  // logout user
  const logout = () =>{
    firebaseApp.auth().signOut()
  }

  return (
    <div style={{backgroundColor:'ButtonHighlight'}}className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5">
      <div className="card-header bg-transparent border-0 text-center"><h3>Welcome {username}</h3></div>
      <div className="card-header bg-transparent border-0 text-center text-uppercase"><h5>Dashboard</h5></div>
      <div className="card-body">
        <p className="text-center mb-3"><input onClick={profile} type='button' className="btn btn-primary btn-lg w-100 " value="Profile" /></p>
        <p className="text-center mb-0"><input onClick={logout} type='button' className="btn btn-danger btn-lg w-100 " value="Log out" /></p>
      </div>
    </div>      
  );
}

export default Dashboard;
