//Contains many alerts to be handled

import React, { Component } from 'react';
import axios from 'axios';
import Header from "./Header";
import { Card, CardHeader, CardBody, CardImg, CardFooter, Button, Modal, ModalHeader, ModalBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import EditPost from './EditPost';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants } from '../Shared/PageVariants';

class ShowPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            deleterRdirectVar: false,
            redirectEditPost: false,
            isDropdownOpen: false,
        }
        this.addToSavePosts = this.addToSavePosts.bind(this);
        this.toggleEditPost = this.toggleEditPost.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen,
        });
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

    deletePost(event) {
        event.preventDefault();
        let data = {
            id: this.props.particularPostDetail.idposts,
            fileName: this.props.particularPostDetail.file_name,
        }

        axios.post('http://localhost:5000/deletePost', data)
            .then(response => {
                // alert(response.data.msg);
                this.setState({
                    deleteRedirectVar: true,
                })
            })
            .catch(response => {
                alert(response);
            });
    }

    addToSavePosts(event) {
        event.preventDefault();

        let data = {
            id: this.props.particularPostDetail.idposts,
        }

        axios.defaults.withCredentials = true;
        axios.post('/addToSavedPosts', data)
            .then((response) => {
                alert(response.data.msg);
            })
            .catch((response) => {
                alert(response);
            })
    }

    //alert(JSON.stringify(particularPostDetail));
    render() {
        let filePath = '../../backend/uploads/AU1940049' + '/' + this.props.particularPostDetail.file_name;
        if (this.state.deleteRedirectVar) {
            return (
                <Redirect to="/userPosts" />
            );
        } else if (this.state.redirectEditPost) {
            return (
                <Redirect to={`/editPost/${this.props.particularPostDetail.idposts}`} />
            );
        }
        let displayURL;
        if (this.props.particularPostDetail.url) {
            // console.log('url ' + this.props.particularPostDetail.url);
            displayURL = <div className="mt-2"><strong>Want to view the site? </strong><a href={this.props.particularPostDetail.url} >Click Me</a></div>
        }
        return (
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
                <div className="d-flex justify-content-center">
                    <div className="col-md-6">
                        <Card className="mb-3 mt-1">
                            <CardHeader style={{ backgroundColor: "black", borderColor: "black" }}>
                                <div className="d-flex justify-content-center text-light">
                                    <h3>{this.props.particularPostDetail.title}</h3>
                                    <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.handleToggle} className="ml-auto">
                                        <DropdownToggle style={{ backgroundColor: "black", borderColor: "black" }}>
                                            <i className="fa fa-ellipsis-v fa-dark ml-1" />
                                        </DropdownToggle>
                                        <DropdownMenu style={{ borderWidth: "2px", borderColor: 'black' }}>
                                            <DropdownItem onClick={this.toggleEditPost}>
                                                Edit Post<span className="ml-2 fa fa-pencil"></span>
                                            </DropdownItem>
                                            <DropdownItem onClick={this.toggleModal}>
                                                Delete <span className="ml-2 fa fa-trash-o"></span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </CardHeader>
                            <CardBody className="bg-white">
                                <strong> Description: </strong>{this.props.particularPostDetail.description}<br />
                                {displayURL}
                            </CardBody>
                            <CardFooter className="bg-white">
                                <div className="d-flex justify-content-center">
                                    <div>
                                        <h6 className="d-flex justify-content-start text-small" style={{ textColor: "grey" }}>{this.props.particularPostDetail.email}</h6>
                                        <h6 className="text-small">{this.props.particularPostDetail.date_time}</h6>
                                    </div>
                                    {/* <Button className="btn m-1" color="success">Download<span className="ml-2 fa fa-download"></span> </Button> */}
                                    <Button className="btn m-1 ml-auto" color="primary" onClick={this.addToSavePosts}>Save<span className="ml-2 fa fa-bookmark"></span></Button>
                                </div>
                            </CardFooter>
                            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>Confirm Delete</ModalHeader>
                                <ModalBody>
                                    <h6>Are you sure you want to delete?</h6>
                                    <Button className="btn mt-2 mr-2" color="danger" onClick={this.deletePost}>Confirm</Button>
                                    <Button className="btn mt-2" color="success" onClick={this.toggleModal}>Cancel</Button>
                                </ModalBody>
                            </Modal>
                        </Card>
                    </div>
                </div>
            </motion.div>
        );
    }
}

class UserPosts extends Component {
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
                if (response.data.data.results.length !== 0) {
                    this.setState({
                        postDetails: response.data.data.results,
                        redirectVar: true,
                    });
                } else {
                    alert(JSON.stringify(response.data.msg));
                }

            })
            .catch(response => {
                alert(response);
            });
    }

    render() {
        let display = this.state.postDetails.map((post) => {
            return (
                <ShowPost particularPostDetail={post} />
            );
        });
        if (this.state.redirectVar) {
            return (
                <div className="bg_relative">
                    <Header />
                    {/* <ShowBreadcrumb /> */}
                    {display}
                </div>
            );
        } else {
            return (
                <div>
                    <Header />
                    {/* <ShowBreadcrumb /> */}
                    <h5>No posts yet</h5>
                </div>
            )
        }
    }
}
export default UserPosts;
