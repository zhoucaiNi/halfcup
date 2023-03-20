import React from 'react'
import pending from "../assets/pendingTable.svg"
import "../style.scss"

const Game = () => {
  return (
    <div className="game">
      <div className="wrapper">
        <div className="user">
          {/* <img src="" alt="" /> */}
          <div className="circle">Z</div>
          <span> Zhoucai</span>
        </div>
        <img src={pending} alt="table" />
        <div className="user">
          <img src="" alt="" />
          <div className="circle">Z</div>
          <span> Budin</span>
        </div>
      </div>
    </div>
  )
}

export default Game