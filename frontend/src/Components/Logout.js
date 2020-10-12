import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

class Logout extends Component {
    constructor(props) {
        super(props);
        
        this.logoutStatus = this.logoutStatus.bind(this);
    }

    componentDidMount() {
        this.logoutStatus();
    }

    async logoutStatus() {
        axios.get('http://localhost:5000/logout');
        cookie.remove('cookie');
    }

    render() {
        return(
            <Redirect to='/login' />
        );
    }
}

export default Logout;