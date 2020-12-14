import React, {Component} from 'react';
import axios from 'axios';
import Header from "./Header";
import { Card, CardHeader, CardBody, CardImg, CardFooter, Button,Modal, ModalHeader, ModalBody } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import EditPost from './EditPost';
import ShowBreadcrumb from './ShowBreadcrumb';

class ShowPost extends Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false,
            deleterRdirectVar: false,
            redirectEditPost: false,
        }
        this.addToSavePosts = this.addToSavePosts.bind(this);
        this.toggleEditPost = this.toggleEditPost.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    toggleEditPost() {
        this.setState({
            redirectEditPost: true,
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    deletePost(event){
        event.preventDefault();
        let data = {
            id: this.props.particularPostDetail.idposts,
            fileName: this.props.particularPostDetail.file_name,
        }

        axios.post('http://localhost:5000/deletePost', data)
            .then(response => {
                alert(response.data.msg);
                this.setState({
                    deleteRedirectVar: true,
                })
            })
            .catch(response => {
                alert(response);
            });
    }

    addToSavePosts(event){
        event.preventDefault();

        let data={
            id: this.props.particularPostDetail.idposts,
        }

        axios.defaults.withCredentials = true;
        axios.post('/addToSavedPosts', data)
            .then((response) =>{
                alert(response.data.msg);
            })
            .catch((response) => {
                alert(response);
            })
    }

    //alert(JSON.stringify(particularPostDetail));
    render(){
    let filePath = '../../backend/uploads/AU1940049' + '/' + this.props.particularPostDetail.file_name;
        if(this.state.deleteRedirectVar){
            return(
                <Redirect to="/userPosts" />
            );
        } else if(this.state.redirectEditPost) {
            return(
                <EditPost details={this.props.particularPostDetail} />
            );
        }
        let displayURL;
        if(this.props.particularPostDetail.url) {
            console.log('url ' + this.props.particularPostDetail.url);
            displayURL = <div>Want to view the site? <a href={this.props.particularPostDetail.url} >Click Me</a></div>
        }
        return(
            <div>
                <div className="container">
                    <Card className="col-12 mb-2">
                        <CardHeader className="bg-white"><div className="d-flex justify-content-center"><h3>{this.props.particularPostDetail.title}</h3></div></CardHeader>
                        <CardBody>
                            Description: {this.props.particularPostDetail.description}<br />
                            {displayURL}
                        </CardBody>
                        <div className="d-flex justify-content-center">
                            <CardFooter className="bg-white">
                                <Button className="btn m-1" color="warning" onClick={this.toggleEditPost}>Edit<span className="ml-2 fa fa-pencil"></span></Button>
                                <Button className="btn m-1" color="success">Download<span className="ml-2 fa fa-download"></span> </Button>
                                <Button className="btn m-1" color="danger" onClick={this.toggleModal}>Delete<span className="ml-2 fa fa-trash-o"></span></Button>
                                <Button className="btn m-1" color="primary" onClick={this.addToSavePosts}>Save<span className="ml-2 fa fa-bookmark"></span></Button>
                            </CardFooter>
                            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>Confirm Delete</ModalHeader>
                                <ModalBody>
                                    <h6>Are you sure you want to delete?</h6>
                                    <Button className="btn mt-2 mr-2" color="danger" onClick={this.deletePost}>Confirm</Button>
                                    <Button className="btn mt-2" color="success" onClick={this.toggleModal}>Cancel</Button> 
                                </ModalBody>
                            </Modal>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

class UserPosts extends Component{
    constructor(props) {
        super(props);

        this.state = {
            postDetails: [],
            redirectvar: false,
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/userPost')
            .then(response => {
                //alert(JSON.stringify(response.data.data.results[0].email) + "             " + typeof response.data.data.results);
                if(response.data.data.results.length !== 0) {
                    this.setState({
                        postDetails: response.data.data.results,
                        redirectVar: true,
                    });
                }
                
            })
            .catch(response => {
                alert(response);
            });
    }

    render(){
        let display = this.state.postDetails.map((post) => {
            return(
                <ShowPost particularPostDetail={post} />
            );
        });
        if(this.state.redirectVar) {
            return(
                <div className="bg">
                    <Header />
                    <ShowBreadcrumb />
                    {display}
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            );
        } else {
            return(
                <div>
                    <Header />
                    <ShowBreadcrumb />
                    <h5>No posts yet</h5>
                </div>
            )
        }
    }
}
export default UserPosts;
