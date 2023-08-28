import React from 'react'
import BracketForm from '../componenets/BracketForm'
import BracketDisplay from '../componenets/BracketDisplay'
import "../styles/bracket.scss"
import { useDispatch } from 'react-redux';
import { resetInitialState } from '../actions'

const CreateLeague = () => {
  const dispatch = useDispatch()
  dispatch(resetInitialState())

  return (
    <div className='createLeague'>
      <div className='leagueCreateContainer'>
        <BracketForm />
        <BracketDisplay />
      </div>
    </div>
  )
}

export default CreateLeague