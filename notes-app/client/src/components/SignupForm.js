import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class SignupForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      password: "",
      showError: false
    }
  }

  handleSubmitForm = async (event) => {
    event.preventDefault()

    const { name, email, password } = this.state
    const { handleSignup } = this.props

    try {
      await handleSignup({ name, email, password })
    } catch (error) {
      this.setState(state => {
        return { showError: true }
      })
      throw error
    }
  }

  handleTextInput = (event) => {
    const { name, value } = event.target
    this.setState(state => {
      return {
        [name]: value
      }
    })
  }

  render() {
    const { isSignedIn } = this.props
    const { showError } = this.props

    let errorMessage
    if(showError){
      errorMessage = (
        <div>
          <span>Sign In Error!!</span>
        </div>
      )
    }
    if (isSignedIn) {
      return <Redirect to="/folders" />
    }
    return (
      <div>
        {errorMessage}
        <form onClick={this.handleSubmitForm}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={this.handleTextInput}
              value={this.state.name}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={this.handleTextInput}
              value={this.state.email}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleTextInput}
              value={this.state.password}
            />
          </div>
          <button>Sign In</button>
        </form>
      </div>
    )
  }
}

export default SignupForm