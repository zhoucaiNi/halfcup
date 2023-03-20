import React from 'react'
import Usernav from '../componenets/Usernav'
import Sidebar from "../componenets/Sidebar"
import Gamehistory from '../componenets/Gamehistory'
import "../style.scss";

const Games = () => {
  return (
    <div className='games'>
      <Usernav />
      <div className="gamesContainer">
        <Sidebar />
        <Gamehistory />
      </div>
    </div>

  )
}

export default Games