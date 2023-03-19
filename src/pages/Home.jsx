import React, { useContext } from 'react'
import "../style.scss"
import eye from "../assets/Eyeofpingus.svg"
import Header from '../componenets/Header'
import { AuthContext } from '../context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export const Home = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return (
      <div>
        <span> you're logged in {currentUser.username}</span>
        <button onClick={() => signOut(auth)}> logout</button>
      </div>
    )
  } else {
    return (
      <div className='homeContainer'>
        <Header />

        <div className="homeContent">
          <span> Fellowship of the Rings</span>
          <img src={eye} alt=""></img>
          <button> Get started!</button>
        </div>
      </div>
    )

  }
}
