import React from 'react'
import Search from './Search'
import SuggestedUsers from './SuggestedUsers'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="title">
        <span> Find Games </span>
      </div>

      <Search />
      <SuggestedUsers />
    </div>
  )
}

export default Sidebar