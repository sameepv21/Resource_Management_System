import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './Home';
import NewPost from './NewPost';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Verify from './Verify';
import UserPosts from './UserPosts';

class Main extends Component {
    render() {
        return(
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path='/logout' component={Logout} />
                <Route path="/newPost" component={NewPost} />
                <Route path='/editProfile' component={EditProfile} />
                <Route path="/profile" component={Profile} />
                <Route path='/userPosts' component={UserPosts} />
                <Route path="/verify" component={Verify} />
                <Redirect to="/login" />
            </Switch>
        );
    }
}

export default Main;