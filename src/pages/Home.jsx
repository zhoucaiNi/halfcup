import React, { useContext } from 'react'
import "../styles/style.scss"
import eye from "../assets/EyeofPingus2.svg"
import { AuthContext } from '../context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(currentUser)

  if (currentUser) {
    return (
      <div className='homeContainer'>
        {/* <Usernav /> */}
        <span> you're logged in {currentUser.displayName}</span>

        <div className="lore">
          <p>
            In a world where beer pong is more than just a game, a fellowship of players compete for special rings that grant them powers. Ring players must play one games a week, three games max, including matches against those who lost their rings. The ultimate goal is to win a 1v1 tournament, where the victor takes all the rings and becomes the Lord of the Rings.
          </p>
        </div>
        <img src={eye} alt=""></img>
        <button onClick={() => signOut(auth)}> logout</button>
      </div>
    )
  } else {
    return (
      <div className='homeContainer'>
        {/* <Header /> */}

        <div className="homeContent">
          <span> Got a tournament? </span>
          <img src={eye} alt=""></img>
          <button onClick={() => navigate("/signup")}> Get started!</button>
        </div>
      </div>
    )

  }
}
