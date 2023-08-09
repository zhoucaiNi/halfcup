import React from 'react'
import "../styles/style.scss"
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <span className='logo'>
        <Link className="logo" to="/">
          Ringdom
        </Link>
      </span>
      <div className="links">
        <button className='login' onClick={() => { navigate("/leagues") }}> Leagues </button>
        <button className='signup' onClick={() => { navigate("/signup") }}>sign up </button>
        <button className='login' onClick={() => { navigate("/login") }}> log in </button>

      </div>
    </div>
  )
}

export default Header