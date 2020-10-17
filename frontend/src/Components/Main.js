import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './Home';
import NewPost from './NewPost';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Verify from './Verify';
import SavedPost from './SavedPost';
import UserPosts from './UserPosts';
import School from './School';

class Main extends Component {
    render() {
        return(
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path='/logout' component={Logout} />
                <Route path="/verify" component={Verify} />
                <Route path="/school" component={School} />
                <Route path="/newPost" component={NewPost} />
                <Route path="/profile" component={Profile} />
                <Route path='/userPosts' component={UserPosts} />
                <Route path='/savedPosts' component={SavedPost} />
                <Route path='/editProfile' component={EditProfile} />
                <Redirect to="/login" />
            </Switch>
        );
    }
}

export default Main;