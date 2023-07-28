import React, { useContext } from 'react'
import Usernav from '../componenets/Usernav'
import Header from '../componenets/Header'
import { AuthContext } from '../context/AuthContext'

const Leagues = () => {

  const { currentUser } = useContext(AuthContext);
  return (
    <div className='homeContainer'>

      {currentUser ? <Usernav /> : <Header />}
      Leagues

    </div>
  )
}

export default Leagues