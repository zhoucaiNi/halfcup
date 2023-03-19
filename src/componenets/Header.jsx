import React from 'react'
import "../style.scss";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">

      <span>
        <Link className="logo" to="/">
          Ringdom
        </Link>
      </span>
      <div className="links">
        <button className='signup' onClick={() => { navigate("/signup") }}>sign up </button>
        <button className='login' onClick={() => { navigate("/login") }}> log in </button>
      </div>
    </div>
  )
}

export default Header