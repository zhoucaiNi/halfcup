import React, { useContext, useEffect, useState } from 'react'
import Game from '../componenets/Game'
import Usernav from '../componenets/Usernav'
import { doc, arrayUnion, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../style.scss"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom';
import FriendRequest from '../componenets/FriendRequest';

const Profile = () => {
  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext);
  const [friendRequest, setFriendRequest] = useState(null)
  const [sameUser, setSameUser] = useState(false)
  const params = useParams();
  const userUID = params.id.substring(1)
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  useEffect(() => {
    if (userUID === currentUser.uid) {
      setSameUser(true)
      console.log(sameUser)
    }
  }, [userUID, currentUser, sameUser])

  const getUser = async () => {
    const q = query(collection(db, "users"), where("uid", "==", userUID))
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
        if (userUID === currentUser.uid) {
          setFriendRequest(doc.data().friendRequest)
        }
      })

    } catch (err) {
      console.log(err)
      setErr(true)
    }
  }

  const handleAddFriend = async (e) => {
    e.preventDefault()
    // create a userFriendlist
    await updateDoc(doc(db, "users", userUID), {
      friendRequest: arrayUnion(currentUser.uid)
    });

  }

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
        {!sameUser &&
          <div>
            <button onClick={handleAddFriend}> Add Friend </button>
          </div>
        }

        {friendRequest &&
          <div className="gameBox">
            <span> Friend Request</span>
            <div className='friendReqContainer'>
              {
                friendRequest.map((friend) => (
                  <FriendRequest friend={friend} key={friend} currentUser={currentUser.uid} />
                ))
              }
            </div>
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