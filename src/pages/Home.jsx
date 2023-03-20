import React, { useContext } from 'react'
import "../style.scss"
import eye from "../assets/Eyeofpingus.svg"
import Header from '../componenets/Header'
import { AuthContext } from '../context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import Usernav from '../componenets/Usernav'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(currentUser)

  if (currentUser) {
    return (
      <div className='homeContainer'>
        <Usernav />
        <span> you're logged in {currentUser.displayName}</span>

        <div className="lore">
          <p2>
            In a world where beer pong is more than just a game, a fellowship of players compete for special rings that grant them powers. Ring players must play one games a week, three games max, including matches against those who lost their rings. The ultimate goal is to win a 1v1 tournament, where the victor takes all the rings and becomes the Lord of the Rings.
          </p2>
        </div>
        <img src={eye} alt=""></img>
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
          <button onClick={()=> navigate("/signup")}> Get started!</button>
        </div>
      </div>
    )

  }
}
