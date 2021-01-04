import React, {Component} from 'react';
import {Switch, Route, Redirect, useLocation} from 'react-router-dom';
import Home from './Home';
import NewPost from './NewPost';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Verify from './Verify';
import SavedPost from './SavedPost';
import UserPosts from './UserPosts';
import Stream from './Stream';
import Feed from './Feed';
import SchoolDetails from '../Shared/SchoolDetails';
import EditPost from './EditPost';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import { motion, AnimatePresence } from 'framer-motion';

class Main extends Component {
    render() {


        const SchoolWithId = ({match}) =>{
            return(
                <Stream school={SchoolDetails.filter((school) => school.schoolName === (match.params.schoolName))[0]} />
            );
        }
        const FeedWithId = ({match}) => {
            return(
                <Feed stream = {match.params.stream} />
            )
        }
        const editPostWithId = ({match}) => {
            return(
                <EditPost details = {match.params.post} />
            )
        }
        return(
            <AnimatePresence>
                <Switch location={window.location} key={window.location.pathname}>
                    <Route path="/login" component={Login} />
                    <Route path='/logout' component={Logout} />
                    <Route path="/verify" component={Verify} />
                    <Route exact path="/home" component={Home} />
                    <Route path="/newPost" component={NewPost} />
                    <Route path="/profile" component={Profile} />
                    <Route path='/userPosts' component={UserPosts} />
                    <Route path='/feed/:stream' component={FeedWithId} />
                    <Route path='/savedPosts' component={SavedPost} />
                    <Route path='/editProfile' component={EditProfile} />
                    <Route path='/editPost/:post' component={editPostWithId} />
                    <Route path='/contactUs' component={ContactUs} />
                    <Route path='/aboutUs' component={AboutUs} />
                    <Route exact path='/home/:schoolName' component={SchoolWithId} />
                    {/* <Route exact path='/home/:schoolName/:streamName' component={StreamWithId} /> */}
                    <Redirect to="/login" />
                </Switch>
            </AnimatePresence>
        );
    }
}

export default Main;