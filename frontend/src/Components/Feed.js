import React, { Component } from 'react';
import axios from 'axios';
import {Card, CardImg, CardBody, CardImgOverlay, CardHeader, CardFooter, Button, Form, Input, Label, FormGroup, FormFeedback} from 'reactstrap';
import Header from './Header';

function ShowPosts({result}){
    // alert('display is: ' + JSON.stringify(result))
    var display = result.map((post)=> {
        let displayURL;
        if(post.url) {
            displayURL = <div>Reference: <a href={post.url} className="text-decoration-none">Click Here</a></div>
        }
        return(
            <div className="d-flex justify-content-center">
                <Card className="col-6 mb-2">
                    <CardHeader className="bg-white"><div className="d-flex justify-content-center"><h3>{post.title}</h3></div></CardHeader>
                    <CardBody>
                        Description: {post.description}<br />
                        {displayURL}
                    </CardBody>
                    <div className="d-flex justify-content-center">
                        <CardFooter className="bg-white">
                            <Button className="btn m-1" color="success" download>Download<span className="ml-2 fa fa-download"></span> </Button>
                            <Button className="btn m-1" color="primary">Save<span className="ml-2 fa fa-bookmark"></span></Button>
                        </CardFooter>
                    </div>
                </Card>
            </div>
        );
    })

    return(display);
}

class Feed extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: [],
        }
    }
    componentDidMount(){
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:5000/getFeed", {'headers': {'stream': this.props.stream}})
            .then((posts)=>{
                this.setState({
                    result: posts.data.data,
                })
            })
    }
    render() {
        console.log(this.state);
        if(this.state.result.length == 0){
            return (
                <div className="bg_fixed">
                    <Header />
                    <h1 className="text-light">No posts yet</h1>
                </div>
            );
        } else{
            return(
                <div className="bg_relative">
                    <Header />
                    <ShowPosts result={this.state.result} />
                </div>   
            )
        }
        
    }
}

export default Feed;
