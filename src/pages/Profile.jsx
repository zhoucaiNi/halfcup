import React, { useContext, useEffect, useState } from 'react'
import Game from '../componenets/Game'
import Usernav from '../componenets/Usernav'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../style.scss"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { AuthContext } from '../context/AuthContext'

const Profile = () => {
  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext);
  const { matchHistory, setMatchHistory } = useState([])

  useEffect(() => {
    getMatches()
    console.log(matchHistory)

  })

  const getMatches = async () => {
    const q = query(collection(db, "userMatches"), where("uid", "==", currentUser.uid))

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setMatchHistory(doc.data())
        console.log(doc.data())
      })
    } catch (err) {
      setErr(true)
    }
  }

  return (
    <div className='homeContainer' >
      <Usernav />
      {err && <span> Error </span>}
      <div className="profileContainer">
        <div className="profileBox">
          {currentUser && <div className="circle"> {currentUser.displayName}</div>}
          <span> {currentUser.displayName}</span>
          <div className="winHistory">
            <EmojiEventsIcon className='trophy' />
            <div className="stats">
              <span className='number'>  4 </span>
              <span className="text">  Games Won</span>
            </div>
          </div>
        </div>
        <div className="gameBox">
          <span> My Games</span>
          <Game />
          <Game />
          <Game />
        </div>
      </div>
    </div>
  )
}

export default Profile