import {React, useState} from 'react'
import '../stylesheets/login.css';
import {Visibility, VisibilityOff} from '@material-ui/icons';

function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div style={{backgroundColor:'ButtonHighlight'}}className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5">
      <div className="card-header bg-transparent border-0 text-center"><h3>Welcome Back</h3></div>
      <div className="card-header bg-transparent border-0 text-center text-uppercase"><h5>Login</h5></div>
      <div className="card-body">
        <form>
          <div className="form-group">
            <label>Email<span className="text-danger">*</span></label>
            <input name="email" type="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" placeholder="Email"  />
          </div>
          <div className="form-group">
            <label>Password<span className="text-danger">*</span></label>
            <div style={{flexDirection:'row',display:'flex'}}>
              <div style={{flex:7}}>
                  <input name="password" type={passwordShown ? "text" : "password"}  defaultValue={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3" placeholder="Password"  />
              </div>
              <div style={{flex:1}}>
                  {passwordShown == true ? 
                  <VisibilityOff className='icons' onClick={togglePassword} />
                  :
                  <Visibility className='icons' onClick={togglePassword} />
                  }
              </div>
            </div>
          </div>
          <p className="text-center mb-0"><input type="submit" className="btn btn-primary btn-lg w-100 text-uppercase" value="Login" /></p>
        </form>
        <div className="card-header bg-transparent border-0 text-center"><p>Do not have account? <span><a href='='>Register here</a></span></p></div>
      </div>
    </div>
          
  );
}

export default Login;
