import React from 'react';

const Bracket = ({ tournament }) => {
const roundLength= (Object.keys(tournament.matches).length);

  return (
    <div className="bracket">
      {Object.keys(tournament.matches).map((roundKey, index) => {
        const roundMatches = tournament.matches[roundKey];
        return (
          <div className="round" key={index}>
            <div className="title">{`Round ${index + 1}`}</div>
            <div className="matchups">
              {roundMatches.map((match, matchIndex) => (
                <div className={index === roundLength-1 ? 'finalBracketGame' : 'bracketGame'} key={matchIndex}>
                  <div className="playerContainer">
                    {match.participants.map((participant, participantIndex) => {
                      const team = tournament.teams[participant.teamUID];
                      return (
                        <div className={`player ${participant.isWinner ? 'winner' : ''}`}>
                          <span>{team ? team.teamName : 'TBD'}</span>
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
  );
};

export default Bracket;
