import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import "../styles/leagues.scss"
import { db } from "../firebase";
import eye from "../assets/EyeofPingus2.svg"
import { useNavigate } from "react-router-dom";
const League = () => {

  let [tournamentList, setTournamentList] = useState(null);
  // console.log(tournamentList)
  const navigate = useNavigate();

  useEffect(() => {
    // Query the collection
    const queryRef = collection(db, "tournaments");

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const tournaments = [];
      snapshot.forEach((doc) => {
        tournaments.push(doc.data());
      });
      setTournamentList(tournaments);
    });

    // Clean up the subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSelect = async (tournamentID) => {
    // check whether the group (chat in firestore) exists if not create one
    navigate(`/leagues/:${tournamentID}`)
  }

  return (
    <>
      {tournamentList && tournamentList.map((tournament, index) => (
        <div className='leagueContainer' key={index} onClick={() => handleSelect(tournament.UID)} >
          <div className="leagueLeft"> </div>
          <span> {tournament.name} </span>
          <img className="leagueGraphic" src={eye} alt=""></img>
          <div className="leagueRight"> </div>
        </div >
      ))
      }
    </>
  )
}

export default League