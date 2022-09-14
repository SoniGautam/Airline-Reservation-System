import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import auth from "./services/authService";
import ProtectedRoute from './components/common/protectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import PageNotFound from './pages/PageNotFound';
import CheckMail from './pages/CheckMail';
import Home from './pages/Home'


class App extends Component {
    state = {};

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ user });
    }

    render() {
        return (
            <div>                
                <Router>        
                    <Switch>
                        <Route exact path="/" component={ Login } />
                        <ProtectedRoute path="/home"  
                        render={props => <Home user={this.state.user} />}
                        />
                        <Route path="/register" component={ Register } />
                        <Route path="/login" component={ Login } />
                        <Route path="/forget" component={ ForgetPassword } />
                        <Route path="/check" component={ CheckMail } />
                        <Route path="/reset/:userId/:token" component={ ResetPassword } />
                        <Route path="/pageNotFound" component={ PageNotFound } />                      
                        <Redirect to="/pageNotFound" />
                    </Switch>
                </Router>     
                
          </div>
        );
    }
}


export default App;
