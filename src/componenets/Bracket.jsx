import React, { useState } from 'react';
import "../styles/bracket.scss"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';
import { updateWinnerAndSync } from '../actions';
import { useSelector, useDispatch } from 'react-redux';

const Bracket = () => {
  let tournament = useSelector(state => state.bracket);
  const roundLength = (Object.keys(tournament.matches).length);
  const [open, setOpen] = useState(false);
  const [matchIndex, setMatchIndex] = useState(0);
  const [roundIndex, setRoundIndex] = useState(0);
  const dispatch = useDispatch();


  const handleOpen = (participant, roundKey, matchKey) => {
    setOpen(true);
    console.log(participant)
    console.log(matchIndex)
    setMatchIndex(matchKey)
    setRoundIndex(roundKey)
  };


  const handleClose = () => setOpen(false);

  const handleWinner = async (rIndex, mIndex, pIndex, nextMatchId) => {
    console.log(rIndex, mIndex, pIndex, nextMatchId)
    dispatch(updateWinnerAndSync(rIndex, mIndex, pIndex, tournament.UID));
    // try {
    //   dispatch(updateWinner(rIndex, mIndex, pIndex));
    //   console.log("state update complete");

    //   // Update Firebase or any other async operation you need.

    //   console.log(tournament.matches);
    //   await updateDoc(doc(db, "tournaments", tournament.UID), {
    //     matches: tournament.matches
    //   });
    // } catch (error) {
    //   console.log("Error while updating winner:", error);
    // }

    setMatchIndex(mIndex)
    setRoundIndex(rIndex)

  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <span className='tournamentName'> {tournament.name} </span>
      <div className="bracket">
        {Object.keys(tournament.matches).map((roundKey, index) => {
          const roundMatches = tournament.matches[roundKey];
          return (
            <div className="round" key={index}>
              <div className="title">{`Round ${index + 1}`}</div>
              <div className="matchups">
                {roundMatches.map((match, matchIndex) => (
                  <div className={`${index === roundLength - 1 ? 'finalBracketGame' : 'bracketGame'} ${match.state === "pending" ? 'pending' : ''}`} key={matchIndex}>
                    <div onClick={() => handleOpen(match, roundKey, matchIndex)} className={`playerContainer`}>
                      {match.participants.map((participant, participantIndex) => {
                        const team = tournament.teams[participant.teamUID];
                        return (
                          <div className={`player ${participant.isWinner ? 'winner' : ''}`} key={participantIndex}>
                            <span className='seed' >{(tournament.teams[participant.teamUID].seed && tournament.teams[participant.teamUID].seed !== -9999) ? tournament.teams[participant.teamUID].seed : ""}</span>
                            <span className='teamName'>{team ? team.teamName : 'TBD'}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2"> </Typography>
            <div className="reportHeader">
              <span> Winner </span>
              <span> Score</span>
            </div>
            <div className="scoreReport">
              {tournament.matches[roundIndex] && tournament.matches[roundIndex][matchIndex].participants.map((participant, participantIndex) => {
                return (
                  <div className="playerHeader">
                    <div className='leftHeader'>
                      <span className='seed' >{(tournament.teams[participant.teamUID].seed && tournament.teams[participant.teamUID].seed !== -9999) ? tournament.teams[participant.teamUID].seed : ""}</span>
                      <span key={participantIndex}>{tournament.teams[participant.teamUID].teamName}</span>
                    </div>
                    <div className='rightHeader'>
                      <CheckIcon className={`check ${participant.isWinner ? 'winner' : ''}`} onClick={() => handleWinner(roundIndex, matchIndex, participantIndex)} />
                      <div className='scoreBar'>
                        <input type="number" className='scoreInput' />
                        <div className='counters'>
                          <button> + </button>
                          <button> - </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              )}
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Bracket;
