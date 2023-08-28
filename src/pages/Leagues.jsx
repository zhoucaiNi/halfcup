import React from 'react'
import { useNavigate } from "react-router-dom";
import Tournaments from '../componenets/Tournaments';
import "../styles/leagues.scss"

const Leagues = () => {
  const navigate = useNavigate();
  return (
    <div className='leaguePageContainer'>
      <div className='leagueContentContainer'>
        <div className='titleContainer'>
          <span className='title'> Tournaments </span>
          <button className='createLeagues' onClick={() => { navigate("/createleague") }}>  Create New Tournament </button>
        </div>
        <div className='leaguesT'>
          <Tournaments />
        </div>
      </div>
    </div>
  )
}

export default Leagues