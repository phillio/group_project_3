import React from 'react'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'

function Login (props) {


  return (
    <div>
      <h1>Login</h1>

      <LoginForm {...props} />
      <h4>New Users Sign Up Below</h4>
      <Link to='/signup'>Sign Up</Link>
    </div>
  )
}

export default Login