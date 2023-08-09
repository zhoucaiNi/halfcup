import React, { useState } from 'react'
import eye from "../assets/Eyeofpingus.svg"
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // filler
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/");
    }
    catch (err) {
      setError(true);
      console.log(error);
    }
  }

  return (
    <div className='authContainer'>
      {/* <Header /> */}
      <div className="formContainer">
        <img src={eye} alt="logo" />
        <span> Welcome back!</span>
        <div className="formWrapper">
          {/* <span> Log in</span> */}
          <form onSubmit={handleSubmit} >
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button >Log in</button>
            {error && <span> something went wrong</span>}
          </form>
          <p> Don't have an account? <Link className="link" to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div >
  )
}

export default Login