import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Bracket from './Bracket';
import "../styles/bracket.scss"

const BracketDisplay = () => {
  // const name = useSelector(state => state.bracket.name);
  const initialState = useSelector(state => state.bracket2);
  // console.log(initialState)
  return (
    <div className='bracketDisplay'>
      {/* <h1 > {name} </h1> */}
      <Bracket tournament={initialState} />
    </div>
  )
}

export default BracketDisplay