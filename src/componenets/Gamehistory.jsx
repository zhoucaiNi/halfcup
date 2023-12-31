import React from 'react'
import { useNavigate } from 'react-router-dom'
import Game from './Game';
import "../styles/style.scss"

const Gamehistory = () => {
  
  const navigate = useNavigate();
  return (
    <div className="gameHistory">
      <div className="title">
        <span> Upcoming games</span>
      </div>
      <div className="gameList">
        <button onClick={() => { navigate("/creategame") }}> Create Game </button>
        <Game />
        <Game />
        <Game />
        <Game />
        <Game />
        <Game />
        <Game />
        <Game />

      </div>
    </div>
  )
}

export default Gamehistory