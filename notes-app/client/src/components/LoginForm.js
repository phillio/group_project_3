import React from 'react'
// import { Redirect } from 'react-router-dom'

class LoginForm extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmitForm = async (event) => {
    event.preventDefault()
    const { email, password } = this.state
    const { handleLogin } = this.props

    try {
      await handleLogin({ email, password })
    }
    catch (error) {
      this.setState(state => {
        return { showError: true }
      })
      throw error
    }
  }
  handleTextInput = (event) => {
    const { name, value } = event.target

    this.setState(state => {
      return { [name]: value }
    })
  }
  render() {
    // const { isSignedIn } = this.props
    // const { showError } = this.state 

    // let errorMessage 

    // if (showError) {
    //     errorMessage = (
    //         <div className='error-message'>
    //             <span>An Error occured, please try again</span>
    //         </div>
    //     )
    // }
    // if (isSignedIn) {
    //     return <Redirect to="/dashboard" />
    // }

    return (
      <div>
        {/* {errorMessage} */}
        <form className="form" onSubmit={this.handleSubmitForm}>
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
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm;