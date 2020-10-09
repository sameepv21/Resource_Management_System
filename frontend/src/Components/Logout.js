import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends Component {
    constructor(props) {
        super(props);
        
        this.logoutStatus = this.logoutStatus.bind(this);
    }

    componentDidMount() {
        this.logoutStatus();
    }

    async logoutStatus() {
        const options = {
            method: 'GET',
            header: {
                'Content-type': 'application/json',
            },
        }

        const getResponse = await fetch('/logout', options);
    }

    render() {
        return(
            <Redirect to='/login' />
        );
    }
}

export default Logout;