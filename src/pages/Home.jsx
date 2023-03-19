import React, { useContext } from 'react'
import "../style.scss"
import eye from "../assets/Eyeofpingus.svg"
import Header from '../componenets/Header'
import { AuthContext } from '../context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import Usernav from '../componenets/Usernav'

export const Home = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)

  if (currentUser) {
    return (
      <div className='homeContainer'>
        <Usernav />
        <span> you're logged in {currentUser.displayName}</span>
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
