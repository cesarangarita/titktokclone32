import React from 'react'
import { FaUsers } from 'react-icons/fa'

function Following() {
  return (
    <div className="following-container">
      <div className="following-header">
        <FaUsers />
        <h1>Following</h1>
      </div>
      <div className="suggested-users">
        {/* Suggested users will go here */}
      </div>
      <div className="following-feed">
        {/* Feed of followed users' videos will go here */}
      </div>
    </div>
  )
}

export default Following
