import React from 'react'
import { useNavigate } from "react-router-dom";

const Leagues = () => {
  const navigate = useNavigate();
  return (
    <div className='homeContainer'>
      <h1> Tournament </h1>
      <button className='createLeagues' onClick={() => { navigate("/createleague") }}>  Create League </button>
      <span> Current Leagues</span>


    </div>
  )
}

export default Leagues