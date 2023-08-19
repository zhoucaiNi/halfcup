import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Bracket from './Bracket';
// import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import "../styles/bracket.scss"

const BracketDisplay = () => {

  // const dispatch = useDispatch();
  // const count = useSelector(state => state.bracket.count);
  const name = useSelector(state => state.bracket.name);
  // const bracketType = useSelector(state => state.bracket.type);
  // const gameMode = useSelector(state => state.bracket.mode);
  const initialState = useSelector(state => state.bracket);
  console.log(initialState)
  return (
    <div className='bracketDisplay'>

      <h1 > {name} </h1>
      {/* <div> bracketType: {bracketType}</div>
      <div> gameMode: {gameMode}</div>
      <div>Current Count: {count}</div> */}

      <Bracket tournament={initialState} />
    </div>
  )
}

export default BracketDisplay