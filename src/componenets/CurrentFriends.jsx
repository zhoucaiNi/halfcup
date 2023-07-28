import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const CurrentFriends = ({ friends }) => {
  // console.log(friends)
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState(null);

  const handleSelect = async (friendUID) => {
    // check whether the group (chat in firestore) exists if not create one
    navigate(`/profile/:${friendUID}`)
  }

  useEffect(() => {
    const getFriends = async () => {
      const friendList = [];
      for (const friendId of friends) {
        const docRef = doc(db, "users", friendId);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // console.log(docSnap.data())
            friendList.push(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (err) {
          console.error("Error getting document:", err);
        }
      }
      setFriendList(friendList);
      console.log(friendList)
    };

    if (friends) {
      getFriends()
    }
  }, [friends])


  return (
    <div className='currentFriends'>
      <p> Current Friends</p>
      {friendList && friendList.map((friend,index) => (
        <div className="friend" onClick={() => handleSelect(friend.uid)} key={index}>
          <div className="profileCircle"> {friend.displayName.substring(0, 1)} </div>
          <p>{friend.displayName}</p>
        </div>
      ))
      }
    </div>
  )
}

export default CurrentFriends