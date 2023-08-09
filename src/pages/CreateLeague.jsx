import React from 'react'
import BracketForm from '../componenets/BracketForm'
import BracketDisplay from '../componenets/BracketDisplay'
import "../styles/bracket.scss"

const CreateLeague = () => {
  return (
    <div className='createLeague'>
      <h1> Create Tournament </h1>
      <div className='leagueCreateContainer'>
        <BracketForm />
        <BracketDisplay />
      </div>
    </div>
  )
}

export default CreateLeague