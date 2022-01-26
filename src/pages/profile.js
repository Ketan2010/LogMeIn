import {React, useEffect, useState} from 'react'
import '../stylesheets/login.css';
import { firebaseApp } from "../firebase";

function Profile() {
  const user = firebaseApp.auth().currentUser;
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [mobile, setMobile] = useState("")
  const [dob, setDob] = useState("")
  const [age, setAge] = useState("")

  // fetch all details of current user 
  useEffect(() => {
    firebaseApp.database()
    .ref("users/")
    .orderByChild("uid")
    .equalTo(user.uid)
    .once('value')
    .then(snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach((child) => {
                setName(child.val().name)
                setEmail(child.val().email)
                setGender(child.val().gender)
                setMobile(child.val().mobile)
                setDob(child.val().dob)
                setAge(child.val().age)
            }); 
          } 
    });
    
  }, [])

  // method to update changes in profile
  const update = () => {
    // check if all mandatory fileds are provided
    if(name != '' && email!='' &&  gender!='' && mobile!='' && dob!='' && age!=''){
        // validate email
        if( !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) ){
          alert('Please provide correct Email')
        }
        // validate phone number
        else if( !(mobile.match('[0-9]{10}'))){
          alert('Please provide valid phone number')
        }
        // everything is ok, update profile
        else{
          firebaseApp.database()
          .ref("users/"+user.uid)
          .update({
            name: name,
            email: email,
            gender: gender,
            mobile: mobile,
            dob: dob,
            age: age
          })
          .then(() =>alert("Profile has been updated successfully."));
        }
    }
    else {
      alert("Please provide all details before submit")
    }
  }

  // set dob and age on the basis of choosen birth date
  const setDobAge = (e) => {
      // set dob
      setDob(e.target.value)
      var today = new Date();
      var birthDate = new Date(e.target.value);  // create a date object
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      // if month difference is -ve : current age is not completed yet : age --
      // if month difference is 0 but if date is less than birth date: current age is not complete :  age --
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age_now--;
      }
      // set age
      setAge(age_now);
  }

  return (
    <div style={{backgroundColor:'ButtonHighlight'}} className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5">
      <div className="card-header bg-transparent border-0 text-center"><h3>Update your profile</h3></div>
      <div className="card-header bg-transparent border-0 text-center text-uppercase"><h5>Profile</h5></div>
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
          <div className='row'>
            <div className='col'>
                <div className="form-group">
                  <label>Mobile no.<span className="text-danger">*</span></label>
                  <input name="mobile" type="text" defaultValue={mobile} onChange={(e) => setMobile(e.target.value)} className="form-control mb-2" placeholder="Mobile Number"  />
                </div>
            </div>
            <div className='col'>
                <div className="form-group">
                  <label>Gender<span className="text-danger">*</span></label>
                  <select className="form-control mb-2" onChange={(e) => setGender(e.target.value)} value={gender}>
                    <option value=''>Select</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                  </select>            
                </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
                  <div className="form-group">
                    <label>Date of birth<span className="text-danger">*</span></label>
                    <input name="dob" type="date" defaultValue={dob} onChange={(e)=>setDobAge(e)} className="form-control mb-2" />
                  </div>
            </div>
            <div className='col'>
                  <div className="form-group">
                    <label>Age<span className="text-danger">*</span></label>
                    <input name="age" type="text" defaultValue={age} onChange={(e) => setAge(e.target.value)} className="form-control mb-2" placeholder="Age" readOnly={true}/>
                  </div>
            </div>
          </div>
          <p className="text-center mb-2"><input type='button' onClick={update} className="btn btn-primary btn-lg w-100 " value="Update Profile" /></p>
          <p className="text-center mb-0"><input type='button' onClick={()=>{window.location.href = "/dashboard"}} className="btn btn-secondary btn-lg w-100 " value="Cancle" /></p>
        </form>
      </div>
    </div>
  );
}

export default Profile;
