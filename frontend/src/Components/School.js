import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Header from './Header';

class School extends Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <Header />
        )
    }
}

export default School;