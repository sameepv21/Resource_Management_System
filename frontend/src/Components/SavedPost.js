import React, {Component} from 'react';
import ShowBreadcrumb from './ShowBreadcrumb';
import {Card, CardHeader, CardBody, CardFooter, Button} from 'reactstrap';
import axios from 'axios';
import Header from './Header';

class ShowSavedPost extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.props.details.file){
            return(
                <div>
                    <ShowBreadcrumb />
                    <div className="container">
                        <Card className="col-12 mb-2">
                            <CardHeader className="bg-white"><div className="d-flex justify-content-center"><h3>{this.props.details.title}</h3></div></CardHeader>
                            <CardBody>
                                (*File comes here*)<br/>
                                Description: {this.props.details.description}<br />
                                Want to view the site? <a href={this.props.details.url} >Click Me</a>
                            </CardBody>
                            <CardFooter className="bg-white d-flex justify-content-center">
                                <Button className="btn m-1" color="success">Download<span className="ml-2 fa fa-download"></span> </Button>
                                <Button className="btn m-1" color="danger" onClick={this.addToSavePosts}>Unsave<span className="ml-2 fa fa-ban"></span></Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            );
        }
       else{
            return(
                <div>
                    <ShowBreadcrumb />
                    <div className="container">
                        <Card className="col-12 mb-2">
                            <CardHeader className="bg-white"><div className="d-flex justify-content-center"><h3>{this.props.details.title}</h3></div></CardHeader>
                            <CardBody>
                                (*File comes here*)<br/>
                                Description: {this.props.details.description}<br />
                                Want to view the site? <a href={this.props.details.url} >Click Me</a>
                            </CardBody>
                            <CardFooter className="bg-white d-flex justify-content-center">
                                <Button className="btn m-1" color="danger" onClick={this.addToSavePosts}>Unsave<span className="ml-1 fa fa-ban"></span></Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            );
       } 
    }
}

class SavedPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            details_saved: [],
            redirectVar: false,
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/savedPosts')
            .then(response => {
                this.setState({
                    details_saved: response.data.data.results,
                    redirectVar: true,
                });
            })
            .catch(response => {
                alert(response);
            })
    }

    render() {
        let display, msg="";
        
        if(this.state.details_saved){
            display = this.state.details_saved.map((post) => {
                return(
                    <ShowSavedPost details={post} />
                );
            })
        }
        else{
            msg = "No saved post";
        }
        if(this.state.redirectVar && msg == "") {
            return(
                <div className="bg">
                    <Header />
                    {display}
                </div>
            );
        }
        else if(this.state.redirectVar && msg != ""){
            return(
                <div className="bg">
                        <Header />
                    <div className="d-flex justify-content-center text-light">
                        <h1>{msg}</h1>
                    </div>
                </div>
            );
        }
        return(
            <div>
                <Header />
                <ShowBreadcrumb />
            </div>
        );
    }
}

export default SavedPost;