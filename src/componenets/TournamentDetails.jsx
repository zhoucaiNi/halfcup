import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { updateFirebase, updateWholeBracket, updateWinner } from '../actions';
import { db } from "../firebase";
import Bracket from './Bracket';
import { useDispatch } from 'react-redux';

import "../styles/leagues.scss"

const TournamentDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const tournamentID = params.id.substring(1)
  let [err, setErr] = useState(false)
  const [tournament, setTournament] = useState(null)

  useEffect(() => {
    getTournament()
    console.log("tournament detail page")
    // if (tournament) {
    //   console.log(tournament)
    //   dispatch(updateWholeBracket(tournament))
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])


  const getTournament = async () => {
    const q = query(collection(db, "tournaments"), where("UID", "==", tournamentID))
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setTournament(doc.data())
        dispatch(updateWholeBracket(doc.data()));
      })

    } catch (err) {
      console.log(err)
      setErr(true)
    }
  }


  return (
    <div className="tournamentDetailContainer">
      {tournament && <Bracket tournament={tournament} />}
    </div>
  )
}

export default TournamentDetails