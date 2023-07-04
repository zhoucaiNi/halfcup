import React, { useState, useContext } from 'react'
import "../style.scss";
import { Link, NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../context/AuthContext'

const Usernav = () => {

  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navContainer">
      <div className="usernav">
        <span>
          <Link className="logo" to="/">
            Ringdom
          </Link>
        </span>

        <nav id="navbar" className='links'>
          <NavLink className='gamesNav' to="/games" >Games </NavLink>
          <NavLink className='leagues' to="/leagues"> Leagues </NavLink>
          <NavLink className='rules' to="/"> Rules</NavLink>
          <NavLink className='profile' to={`/profile/:${currentUser.uid}`}><AccountCircleIcon className="accountCircle" /></NavLink>
        </nav>
        <MenuIcon
          className="menuIcon"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded)
          }} />
      </div>

      <nav id={
        isNavExpanded ? "mobileNavbar" : "hidden"
      }>
        <NavLink className='gamesNav' to="/games" >Games</NavLink>
        <NavLink className='leagues' to="/leagues"> Leagues </NavLink>
        <NavLink className='rules' to="/"> Rules</NavLink>
        <NavLink className='profile' to={`/profile/:${currentUser.uid}`} >Profile</NavLink>
      </nav>
    </div>
  )
}

export default Usernav