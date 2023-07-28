import React, { useEffect, useState } from 'react'
import { doc, collection, query, getDoc, where, getDocs, limit } from "firebase/firestore";
import Search from './Search'
import CurrentFriends from './CurrentFriends'
import SuggestedUsers from './SuggestedUsers'
import { db } from "../firebase";

const Sidebar = (props) => {
  // console.log(currentUID)
  const [userFriends, setUserFriends] = useState(null)
  const [suggestedUsers, setSuggestedUsers] = useState(null)
  const [err, setErr] = useState(false)

  useEffect(() => {

    const getFriends = async () => {
      // console.log(props)
      const docRefs = doc(db, "userFriends", props.currentUID);
      try {
        const docSnap = await getDoc(docRefs);
        if (docSnap.exists()) {
          // console.log(docSnap.data());
          setUserFriends(docSnap.data().friends)

        } else {
          console.log("Document does not exist")
        }

      } catch (err) {
        console.log(err)
        setErr(true)
      }
    }

    if (props.currentUID) {
      // console.log(currentUID)
      getFriends()
    }

  }, [props.currentUID])

  useEffect(() => {
    const getSuggestedUsers = async () => {
      const q = query(collection(db, "users"), where("uid", "not-in", [...userFriends, props.currentUID]), limit(3))

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const uidList = querySnapshot.docs.map(doc => doc.id);
          console.log(uidList);
          setSuggestedUsers(uidList);
        }
      } catch (err) {
        console.log(err)
        setErr(true)
      }
    }

    if (userFriends) {
      getSuggestedUsers()
    }

  }, [userFriends]
  )

  return (
    <div className="sidebar">
      <div className="title">
        <span> Find Games </span>
      </div>

      <Search />
      <SuggestedUsers friends={suggestedUsers} />
      <CurrentFriends friends={userFriends} />
    </div>
  )
}

export default Sidebar