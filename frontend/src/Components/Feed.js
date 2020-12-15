import React, { Component } from 'react';
import axios from 'axios';
import {Card, CardImg, CardBody, CardImgOverlay, CardHeader, CardFooter, Button, Form, Input, Label, FormGroup, FormFeedback} from 'reactstrap';
import Header from './Header';

function ShowPosts({result}){
    var display = result.map((post)=> {

    })
}

class Feed extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: [],
        }
    }
    componentDidMount(){
        let data = { stream: this.props.stream };

        axios.defaults.withCredentials = true;
        axios.get("http://localhost:5000/getFeed", data)
            .then((posts)=>{
                this.setState({
                    result: posts,
                })
            })
    }
    render() {
        if(this.state.result.length == 0){
            return (
                <div className="bg_fixed">
                    <h1 className="text-light">No posts yet</h1>
                </div>
            );
        } else{
            <ShowPosts result={this.state.result} />   
        }
        
    }
}

export default Feed;
