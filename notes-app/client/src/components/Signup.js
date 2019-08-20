import React from 'react'
import SignupForm from './SignupForm'

function SignUp(props){
  return(
    <div>
      <h1>Sign Up</h1>
      <SignupForm {...props}/>
    </div>
  )
}

export default SignUp