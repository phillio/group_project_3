import React, { Component } from 'react'
import './App.css'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import { Route, Link } from 'react-router-dom'
import { login, getProfile, signup } from './services/apiService'
import authService from './services/authService'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
      user: {}
    }
  }

  async componentDidMount() {
    try {
      const fetchedUser = await getProfile()

      this.setState({
        isSignedIn: authService.isAuthenticated(),
        user: fetchedUser
      })
    } catch (e) {
      console.log('Issue fetching token')
      throw e
    }
  }

  loginUser = async (credentials) => {
    try {
      const user = await login(credentials)

      this.setState({
        isSignedIn: true,
        user: user
      })
    } catch (e) {
      throw e
    }
  }

  signOutUser = () => {
    authService.signOut()
    this.setState({
      isSignedIn: false,
      user: {}
    })
  }

  signupUser = async (credentials) => {
    try {
      const user = await signup(credentials)

      this.setState({
        isSignedIn: true,
        user: user
      })
    } catch (e) {
      throw e
    }
  }

  render() {
    const { isSignedIn, user } = this.state

    return (
      <div className='App'>
        <nav>
          <div>
            <Link to='/'>Home</Link>
          </div>

          {isSignedIn &&
            <div className='nav-section'>
              <Link to='/dashboard'>Dashboard</Link>

              <button onClick={this.signOutUser}> Sign out</button>
            </div>
          }

          {!isSignedIn &&
            <div className='nav-section'>
              <Link to='/signup'>Signup</Link>
              <Link to='/login'>Login</Link>
            </div>
          }
        </nav>

        <main>
          <Route exact path='/' component={Home} />

          <ProtectedRoute
            path='/dashboard'
            user={user}
            component={Dashboard}
          />

          <Route
            path='/login'
            render={
              (props) =>
                <Login
                  {...props}
                  handleLogin={this.loginUser}
                  isSignedIn={isSignedIn}
                />
            }
          />

          <Route
            path='/signup'
            render={
              (props) =>
                <Signup
                  {...props}
                  handleSignup={this.signupUser}
                  isSignedIn={isSignedIn}
                />
            }
          />
        </main>
      </div>
    )
  }
}

export default App