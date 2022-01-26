import {React, useState} from 'react'
import '../stylesheets/login.css';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import { firebaseApp } from "../firebase";

function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [cnfpasswordShown, setcnfPasswordShown] = useState(false);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cnfpassword, setcnfPassword] = useState("")


  // toggle password visibility
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // toggle confirm password Visibility
  const cnftogglePassword = () => {
    setcnfPasswordShown(!cnfpasswordShown);
  };

  // method to signup new user
  const signup = () => {
    // all fields are mandatory
    if(name == '' || email == '' || password == '' || cnfpassword == ''){
        alert('Please provide all mandatory fields before submit.');
    }
    // validate email
    else if( !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) ){
        alert('Please provide correct Email')
    }
    // validate password
    // one small  = password.match(/[a-z]/g (/g for keep search)
    // one capital = password.match(/[A-Z]/g)
    // one digit = password.match(/[0-9]/g)
    // length  = password.length >= 8
    // speaical character = password.match(/[^a-zA-Z\d]/g) (not from a-z and -Z and)
    else if( !(password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g) && password.match(/[^a-zA-Z\d]/g) && password.length >= 8)){
      alert('Password is weak! Password must be of atleast 8 characters, atleast 1 capital letter, special character and digit.');
    }
    // password and confirm password should match
    else if(password != cnfpassword){
      alert('Your password and confirm password should match to complete registration.');
    }
    // everything is ok
    else{
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
          .then((res)=>{
                  // set remaining profile details empty
                  firebaseApp.database().ref('users/' + res.user.uid).set({
                    name: name,
                    email: email,
                    gender: '',
                    mobile: '',
                    dob: '',
                    age: '',
                    uid: res.user.uid
                  })
          }, (error)=>{
              alert(error.message)
          }
        )
    }
      
  }

  return (
    <div style={{backgroundColor:'ButtonHighlight'}} className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5">
      <div className="card-header bg-transparent border-0 text-center"><h3>Welcome Back</h3></div>
      <div className="card-header bg-transparent border-0 text-center text-uppercase"><h5>SignUp</h5></div>
      <div className="card-body">
        <form>
          <div className="form-group">
            <label>Name<span className="text-danger">*</span></label>
            <input name="name" type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} className="form-control mb-2" placeholder="Name"  />
          </div>
          <div className="form-group">
            <label>Email<span className="text-danger">*</span></label>
            <input name="email" type="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" placeholder="Email"  />
          </div>
          <div className="form-group">
            <label>Password<span className="text-danger">*</span></label>
            <div style={{flexDirection:'row',display:'flex'}}>
              <div style={{flex:10}}>
                  <input name="password" type={passwordShown ? "text" : "password"}  defaultValue={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-0" placeholder="Password"  />
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
          <div className="card-header bg-transparent border-0"><p style={{fontSize:'12px'}}>Password must be of atleast 8 characters, atleast 1 capital letter, special character and digit.</p></div>
          <div className="form-group">
            <label>Confirm Password<span className="text-danger">*</span></label>
            <div style={{flexDirection:'row',display:'flex'}}>
              <div style={{flex:10}}>
                  <input name="cnfpassword" type={cnfpasswordShown ? "text" : "password"}  defaultValue={cnfpassword} onChange={(e) => setcnfPassword(e.target.value)} className="form-control mb-3" placeholder="Password"  />
              </div>
              <div style={{flex:0}}>
                  {cnfpasswordShown == true ? 
                  <VisibilityOff className='icons' onClick={cnftogglePassword} />
                  :
                  <Visibility className='icons' onClick={cnftogglePassword} />
                  }
              </div>
            </div>
          </div>
          <p className="text-center mb-0"><input type='button' onClick={signup} className="btn btn-primary btn-lg w-100 " value="SignUp" /></p>
        </form>
        <div className="card-header bg-transparent border-0 text-center"><p>Already have account? <span><a href='/'>SignIn here</a></span></p></div>
      </div>
    </div>
          
  );
}

export default Register;
