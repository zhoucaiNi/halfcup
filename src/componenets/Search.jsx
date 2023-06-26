import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, setDoc, updateDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext';
import "../style.scss"

const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username))

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        setUser(doc.data())
      })

    } catch (err) {
      setErr(true)
    }
  }

  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    // check whether the group (chat in firestore) exists if not create one
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "matches", combinedId));
      const res2 = await getDoc(doc(db, "userMatches", currentUser.uid))
      const res3 = await getDoc(doc(db, "userMatches", user.uid))
      console.log("res3")
      console.log(res3)
      // console.log("wtf")
      if (!res.exists()) {
        // create user chats
        console.log("create matches")
        await setDoc(doc(db, "matches", combinedId), { messages: [] });

        if (!res2.exists()) {
          await setDoc(doc(db, "userMatches", currentUser.uid), {})
        }

        await updateDoc(doc(db, "userMatches", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            // photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        })

        // create user chat for the other user
        if (!res3.exists()) {
          await setDoc(doc(db, "userMatches", user.uid), {})
        }

        await updateDoc(doc(db, "userMatches", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            // photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        })
      }
    } catch (err) { console.log(err) }
    // console.log(err)
    console.log("wtf")
    setUser(null);
    setUsername("");
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="find players"
          onKeyDown={handleKey}
          onChange={(e) => {
            setUsername(e.target.value)
            console.log(username)
            if (e.target.value === "") {
              setUser(null);
            }
          }}
        />
      </div>
      {err && <span> User not found  </span>}
      {user && <div className='userChat' onClick={handleSelect}>
        {/* <img src={user.photoURL} alt="" /> */}
        <div className="circle"> {user.displayName.substring(0, 1)} </div>
        <div className="userChatInfo">
          <span> {user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search