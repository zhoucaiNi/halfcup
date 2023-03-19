import React from 'react'
import "../style.scss";
import { Link, NavLink } from "react-router-dom";

const Usernav = () => {
  return (
    <div className="usernav">
      <span>
        <Link className="logo" to="/">
          Ringdom
        </Link>
      </span>

      <nav id="navbar" className='links'>
        <NavLink className='games' to="/games" >Games </NavLink>
        <NavLink className='leagues' to="/leagues"> Leagues </NavLink>
        <NavLink className='rules' to="/"> Rules</NavLink>
      </nav>
    </div>
  )
}

export default Usernav