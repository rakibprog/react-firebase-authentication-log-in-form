
import './App.css';
import {useState} from "react";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail} from "firebase/auth";
import initiliazeAuthentication from './Firebase/Intiliaze-authentication';
initiliazeAuthentication();
function App() {
  const auth = getAuth();
  const [email,setEmail] = useState('');
  const[pass,setPass] = useState('');
  const[error,setError] = useState('');
  const[isLogIn,setLogIn] = useState(false);
  const handleEmailChange  = e => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = e => {
    setPass(e.target.value);
  }
  const handleChecked = e =>{
    setLogIn(e.target.checked);
}
  const HandleSubmit = e => {
    e.preventDefault();
    if(pass.length <= 6){
      setError('Password should be at least 6 characters')
      return;
    }
    const regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(regex.test(pass)){
      setError('Password should contain atleast one number and one special character');
      return;
    }
    console.log(email,pass);  
    isLogIn?ProcessLogin(auth,email,pass) :CreateNewUser(auth,email,pass);
  }
     const CreateNewUser = (auth,email,pass) => {
      createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setError('');
        sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('send');  
        });

      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
     }

     const  ProcessLogin = (auth,email,pass) => {
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setError('');
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
        });
     }

     const handleReset = () =>{
      sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })

     }
  
  return (
    <div className="mx-5 my-5 w-50 mx-auto">
          <form onSubmit={HandleSubmit}>
            <div className="row mb-3">
              <h1>{isLogIn ?'Please Login':'Please Register'}</h1>
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required/>
              </div>
            </div>
            <div className="error text-center">
               <h4>{error}</h4>
            </div>
            <div className="form-check">
                <input onChange={handleChecked} className="form-check-input" type="checkbox" id="gridCheck"/>
                <label className="form-check-label" htmlFor="gridCheck">
                  Already Register?
                </label>
            </div>
            <button type="submit" className="btn btn-primary">{isLogIn?'Sign In':'Register'}</button>
            <button onclick={handleReset} className="btn btn-primary mx-3">Reset Password</button>
          </form>
    </div>
  );
}

export default App;
