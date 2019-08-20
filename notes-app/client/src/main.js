import React from 'react';
import { Route, Link } from 'react-router-dom';

//components
import HomeLoggedIn from './components/HomeLoggedIn'
import Login from './components/Login'
import Signup from './components/Signup'
//helper functions 
import './main.css'
//need authService and apiService

class Main extends React.Component {
    constructor (props) {
        super(props) 
        this.state = {
            isSignedIn: false, 
            user: {}
        }
    }
    render() {
        // const { isSignedIn, user } = this.state 
        return(
            <div className="Main">
                <nav>
                    <div><Link to="/">Home</Link></div>
                    <div><Link to="/login">Login</Link></div>
                    <div><Link to="/signup">Sign Up</Link></div>
                </nav>
                <main>
                    <Route exact path="/" component={HomeLoggedIn}/>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                </main>
            </div>
        )
    }
}

export default Main;