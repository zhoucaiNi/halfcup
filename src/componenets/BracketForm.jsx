import React from 'react'

import { increment, decrement, updateName, updateMode, updateType} from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import "../styles/bracket.scss"

const BracketForm = () => {

  const dispatch = useDispatch();
  const count = useSelector(state => state.bracket.count); // Assuming count is the value you're tracking

  const handleAdd = () => {
    dispatch(increment());
  }

  const handleSubtract = () => {
    dispatch(decrement());
  }

  return (
    <div className='bracketFormContainer'>


      BracketForm

      <form>
        <label>
          Name:
          <input onChange={(e) => dispatch(updateName(e.target.value))} type="text" name="name" />

        </label>
        <label for="bracketType">Bracket Type:</label>
        <select onChange={(e) => dispatch(updateType(e.target.value))} id="bracketType" name="gameMode">
          <option value="0">Single Elimination</option>
          <option value="1">Double Elimination</option>
        </select>
        <label for="gameMode">Game Mode:</label>
        <select onChange={(e) => dispatch(updateMode(e.target.value))} id="gameMode" name="gameMode">
        <option value="0">2 v 2</option>
        <option value="1">1 v 1</option>
      </select>

      <button type="button" onClick={handleAdd}>Add</button>
      <button type="button" onClick={handleSubtract}>Subtract</button>
      <div>Current Count: {count}</div>

      <input type="submit" value="Submit" />
    </form>


    </div >
  )
}

export default BracketForm