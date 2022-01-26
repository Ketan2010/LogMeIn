import {React, useState} from 'react'
import '../stylesheets/login.css';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import { firebaseApp } from "../firebase";

function Login() {
  // state to toggle password visisbility (eye icon)
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // toggle password visibility on icon click
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // method for signin
  const signin = () => {
    // all fields are mandatory
    if(email == '' || password == ''){
        alert('Please provide all mandatory fields before submit.');
    }
    // validate email
    else if( !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) ){
        alert('Please provide correct Email')
    }
    // everything is ok
    else{
      firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then(()=>{

      }, (error)=>{
          alert(error.message)
      })
    }
      
  }

  return (
    <div style={{backgroundColor:'ButtonHighlight'}}className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5">
      <div className="card-header bg-transparent border-0 text-center"><h3>Welcome Back</h3></div>
      <div className="card-header bg-transparent border-0 text-center text-uppercase"><h5>SignIn</h5></div>
      <div className="card-body">
        <form>
          <div className="form-group">
            <label>Email<span className="text-danger">*</span></label>
            <input name="email" type="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" placeholder="Email"  />
          </div>
          <div className="form-group">
            <label>Password<span className="text-danger">*</span></label>
            <div style={{flexDirection:'row',display:'flex'}}>
              <div style={{flex:10}}>
                  <input name="password" type={passwordShown ? "text" : "password"}  defaultValue={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3" placeholder="Password"  />
              </div>
              <div style={{flex:0}}>
                  {passwordShown == true ? 
                  <VisibilityOff className='icons' onClick={togglePassword} />
                  :
                  <Visibility className='icons' onClick={togglePassword} />
                  }
              </div>
            </div>
          </div>
          <p className="text-center mb-0"><input type='button' onClick={signin} className="btn btn-primary btn-lg w-100 " value="SignIn" /></p>
        </form>
        <div className="card-header bg-transparent border-0 text-center"><p>Do not have account? <span><a href='register'>SignUp here</a></span></p></div>
      </div>
    </div>
          
  );
}

export default Login;
