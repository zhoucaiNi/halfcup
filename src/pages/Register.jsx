import React, { useState } from 'react';
import "../style.scss";
import eye from "../assets/Eyeofpingus.svg"
import { Link, useNavigate } from 'react-router-dom';
import Header from '../componenets/Header';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from "../firebase";
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {

  const [error, setError] = useState(false);
  const [errorDetail, setErrorDetail] = useState()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // filler
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const gamesWon = 0

    const friendList = []
    const matchlist = []

    try {
      // create user
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if (res) {
        // update res profile
        await updateProfile(res.user, {
          displayName,
        })

        // create a user 
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          gamesWon
        });

        // create a userFriendlist
        await setDoc(doc(db, "userFriends", res.user.uid), {
          friends: friendList
        });


        // create a userMatch
        await setDoc(doc(db, "usersMatches", res.user.uid), {
          matches: matchlist
        });

      }

    } catch (err) {
      setError(true);
      setErrorDetail(err);
      console.log(errorDetail);
    }

    navigate('/');

  }

  return (
    <div className='authContainer'>
      <Header />
      <div className="formContainer">
        <img src={eye} alt="logo" />
        <span> Get started!</span>
        <div className="formWrapper">
          {/* <span> Register</span> */}
          <form onSubmit={handleSubmit} >
            <input type="text" placeholder='username' />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button >Sign up</button>
            {error && <span> something went wrong</span>}
          </form>
          <p> Have an account? <Link className="link" to="/login">Log in</Link></p>
        </div>
      </div>
    </div >
  )
}

export default Register