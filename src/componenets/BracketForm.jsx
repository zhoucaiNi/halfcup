import React from 'react'
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { increment, decrement, updateName, updateMode, updateType, updateDescription, updateTeamName } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import "../styles/bracket.scss"

const BracketForm = () => {

  const dispatch = useDispatch();
  const count = useSelector(state => state.bracket.count); // Assuming count is the value you're tracking
  let initialState = useSelector(state => state.bracket);

  const handleAdd = () => {
    dispatch(increment());
  }

  const handleSubtract = () => {
    dispatch(decrement());
  }

  const HandleSubmit = async (e) => {
    console.log(initialState)
    const tournamentCollection = collection(db, "tournaments");

    try {
      const docRef = await addDoc(tournamentCollection, {
        ...initialState,
      });
      console.log("Document written with ID: ", docRef.id);

      // add UID to the tournament
      await updateDoc(docRef, {
        UID: docRef.id,
      });


    } catch (error) {
      console.error("Error adding document: ", error);
    }

  }

  return (
    <div className='bracketFormContainer'>
      <span> Bracket Creator </span>
      <form>
        <label>
          Name:
          <input onChange={(e) => dispatch(updateName(e.target.value))} type="text" name="name" placeholder='untitled bracket' />

        </label>
        <label htmlFor="bracketType">Bracket Type:</label>
        <select onChange={(e) => dispatch(updateType(e.target.value))} id="bracketType" name="gameMode">
          <option value="0">Single Elimination</option>
          <option value="1">Double Elimination</option>
        </select>
        <label htmlFor="gameMode">Game Mode:</label>
        <select onChange={(e) => dispatch(updateMode(e.target.value))} id="gameMode" name="gameMode">
          <option value="0">2 v 2</option>
          <option value="1">1 v 1</option>
        </select>


        <label>
          Descriptions:
          <textarea
            onChange={(e) => dispatch(updateDescription(e.target.value))}
            type="text"
            id="description"
            name="description"
            rows="4"
            cols="25"
            placeholder='ping ping ping'
            value=""
          > </textarea>
        </label>

        <div className="participantPanel">
          <div className="participantHeader">
            <span> Participants </span>
            <div>
              <button type="button" onClick={handleAdd}>+</button>
              <button type="button" onClick={handleSubtract}>-</button>
            </div>
          </div>
          <div className="participantList">
            {Object.keys(initialState.teams)
              .filter((team) => team !== "BYE" && team !== "TBD")
              .map((team, teamIndex) => {
                return (
                  <div className='teamLabel' key={teamIndex}>
                    {/* <label className='teamLabel'> */}
                    <span> {initialState.teams[team].seed}</span>
                    <input onChange={(e) => dispatch(updateTeamName(e.target.value, team))} type="text" value={initialState.teams[team].teamName} />
                    {/* </label> */}
                  </div>
                )
              }
              )}
          </div>
        </div>


        <div>Current Team Count: {count}</div>


        < button type="button" value="Submit" onClick={HandleSubmit} > Submit </button>
      </form>


    </div >
  )
}

export default BracketForm