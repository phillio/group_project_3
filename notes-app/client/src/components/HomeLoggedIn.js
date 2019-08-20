import React from 'react'

function HomeLoggedIn() {
  const { user } = props

  return (
    <div>
      <h1>{ user.name && `Welcome back ${user.name}` }</h1>
    </div>
  )
}

export default HomeLoggedIn