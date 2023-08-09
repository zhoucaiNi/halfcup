import React from 'react'
import Sidebar from "../componenets/Sidebar"
import Gamehistory from '../componenets/Gamehistory'
import "../styles/style.scss"
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

const Games = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser)
  return (
    <div className='games'>
      {/* <Usernav /> */}
      <div className="gamesContainer">
        <Sidebar currentUID={currentUser.uid} />
        <Gamehistory />
      </div>
    </div>

  )
}

export default Games