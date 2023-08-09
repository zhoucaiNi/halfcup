import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Bracket from './Bracket';
// import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import "../styles/bracket.scss"

const BracketDisplay = () => {

  // const dispatch = useDispatch();
  const count = useSelector(state => state.bracket.count);
  const name = useSelector(state => state.bracket.name);
  const bracketType = useSelector(state => state.bracket.type);
  const gameMode = useSelector(state => state.bracket.mode);
  const initialState = useSelector(state => state.bracket);
  console.log(initialState)
  return (
    <div className='bracketDisplay'>

      <h1 > {name} </h1>
      {/* <div> bracketType: {bracketType}</div>
      <div> gameMode: {gameMode}</div>
      <div>Current Count: {count}</div> */}

      <Bracket tournament={initialState} />


      {/* <div className="bracket">
        <div className="round">
          <div className="title"> Round 1 </div>
          <div className="matchups">
            <div className="bracketGame">
              <div className='playerContainer'>
                <div className="player"><span>Team 3</span></div>
                <div className="player winner"><span>Team 4</span></div>
              </div>
            </div>
            <div className="bracketGame">
              <div className='playerContainer'>
                <div className="player"><span>Team 3</span></div>
                <div className="player winner"><span>Team 4</span></div>
              </div>
            </div>
            <div className="bracketGame">
              <div className='playerContainer'>
                <div className="player"><span>Team 3</span></div>
                <div className="player winner"><span>Team 4</span></div>
              </div>
            </div>
            <div className="bracketGame">
              <div className='playerContainer'>
                <div className="player"><span>Team 3</span></div>
                <div className="player"><span>Team 4</span></div>
              </div>
            </div>
          </div>

        </div>

        <div className="round">
          <div className="title"> Round 2 </div>
          <div className="matchups">
            <div className="bracketGame">
              <div className='playerContainer'>
                <div className="player"><span> TBD </span></div>
                <div className="player"><span>TBD</span></div>
              </div>
            </div>
            <div className="bracketGame">
              <div className='playerContainer'>
                <div className="player"><span> TBD  </span></div>
                <div className="player"><span> TBD </span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="round">
          <div className="title"> Final </div>
          <div className="matchups">
            <div className="finalBracketGame">
              <div className='playerContainer'>
                <div className="player"><span>Team 3</span></div>
                <div className="player"><span>Team 4</span></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default BracketDisplay