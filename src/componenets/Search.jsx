import React, { useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
// import { collection, query, where, getDocs, setDoc, updateDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
// import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import "../style.scss"

const Search = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  // const { currentUser } = useContext(AuthContext);

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

    navigate(`/profile/:${user.uid}`)

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