import React, { useEffect, useState } from 'react'
import { doc, collection, query, getDocs, where, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";


const FriendRequest = ({ friend, currentUser }) => {

  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  // console.log(currentUser)

  const handleAccept = async () => {
    // add friend to user
    try {
      await updateDoc(doc(db, "userFriends", currentUser), {
        friends: arrayUnion(friend)
      });

      await updateDoc(doc(db, "userFriends", friend), {
        friends: arrayUnion(currentUser)
      });

      console.log("friend added")
    } catch (err) {
      console.log(err)
      setErr(true)
    }

    // remove from request

    try {
      const docRef = doc(db, "users", currentUser);
      console.log(friend)
      await updateDoc(docRef, {
        friendRequest: arrayRemove(friend)
      });

      console.log("friendreq removed")
    }
    catch (err) {
      console.log(err)
      setErr(true)
    }
  }


  const handleDecline = async () => {
    try {
      const docRef = doc(db, "users", currentUser);
      console.log(friend)
      await updateDoc(docRef, {
        friendRequest: arrayRemove(friend)
      });

      console.log("friendreq removed")
    }
    catch (err) {
      console.log(err)
      setErr(true)
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const q = query(collection(db, "users"), where("uid", "==", friend))
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data())
          console.log(doc.data())
        })

      } catch (err) {
        console.log(err)
        setErr(true)
      }
    }

    getUser()

  }, [friend])



  return (
    <>
      {user &&
        <div className='friendReqBox'>
          <div className='friendTitle'>
            <div className="circle"> {user.displayName.substring(0, 1)} </div>
            <p>{user.displayName}</p>
          </div>
          <div className="friendReqButtons">
            <button onClick={handleAccept}> Accept </button>
            <button onClick={handleDecline}> Decline </button>
          </div>
        </div>
      }
    </>
  )
}

export default FriendRequest