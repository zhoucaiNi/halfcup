import React, { useContext, useEffect, useState } from 'react'
import Game from '../componenets/Game'
import Usernav from '../componenets/Usernav'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../style.scss"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext);
  const [matchHistory, setMatchHistory] = useState([])
  const [sameUser, setSameUser] = useState(false)
  const params = useParams();
  const userUID = params.id.substring(1)
  if (userUID === currentUser.id) {
    setSameUser(true)
}

  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser()


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const getUser = async () => {
    const q = query(collection(db, "users"), where("uid", "==", userUID))

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        setUser(doc.data())
      })

    } catch (err) {
      console.log(err)
      setErr(true)
    }
  }

  // const getMatches = async () => {
  //   const q = query(collection(db, "userMatches"), where("uid", "==", currentUser.uid))

  //   try {
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       // setMatchHistory(doc.data())
  //       console.log(doc.data())
  //     })
  //   } catch (err) {
  //     setErr(true)
  //   }
  // }

  return (
    <div className='homeContainer' >
      <Usernav />
      {err && <span> Error </span>}
      <div className="profileContainer">
        <div className="profileBox">
          {user && <div className="circle"> {user.displayName}</div>}
          {user ? <span> {user.displayName} </span> : <span> loading.... </span>}
          <div className="winHistory">
            <EmojiEventsIcon className='trophy' />
            <div className="stats">
              {user ? <span className='number'>  {user.gamesWon} </span> : <span className='number'>  4 </span>}
              <span className="text">  Games Won</span>
            </div>
          </div>
        </div>
        {sameUser &&
          <div>
            <button> Add Friend </button>
          </div>
        }

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