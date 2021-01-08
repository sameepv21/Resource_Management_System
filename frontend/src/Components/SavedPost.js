//Contains an alert that needs to be handled


import React, { Component } from 'react';
import ShowBreadcrumb from './ShowBreadcrumb';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardImg, CardFooter, Button, Modal, ModalHeader, ModalBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { motion } from 'framer-motion';
import Header from './Header';
import { pageVariants } from '../Shared/PageVariants';

class ShowSavedPost extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.details.file) {
            return (
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
                    <div>
                        {/* <ShowBreadcrumb /> */}
                        <div className="d-flex justify-content-center">
                            <Card className="col-md-6 mb-2">
                                <CardHeader className="bg-white"><div className="d-flex justify-content-center"><h3>{this.props.details.title}</h3></div></CardHeader>
                                <CardBody>
                                    (*File comes here*)<br />
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
                </motion.div>
            );
        }
        else {
            return (
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
                    <div className="d-flex justify-content-center">
                        <div className="col-md-6">
                            <Card className="mb-3 mt-1">
                                <CardHeader style={{ backgroundColor: "black", borderColor: "black" }}>
                                    <div className="d-flex justify-content-center text-light">
                                        <h3>{this.props.details.title}</h3>
                                    </div>
                                </CardHeader>
                                <CardBody className="bg-white">
                                    <strong> Description: </strong>{this.props.details.description}<br />
                                </CardBody>
                                <CardFooter className="bg-white">
                                    <div className="d-flex justify-content-center">
                                        <div>
                                            <h6 className="d-flex justify-content-start text-small" style={{ textColor: "grey" }}>Aneri Dalwadi</h6>
                                            <h6 className="text-small">{this.props.details.date_time}</h6>
                                        </div>
                                        {/* <Button className="btn m-1" color="success">Download<span className="ml-2 fa fa-download"></span> </Button> */}
                                        <Button className="btn m-1 ml-auto" color="danger" onClick={this.addToSavePosts}>Unsave<span className="ml-2 fa fa-bookmark"></span></Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </motion.div>

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
        let display, msg = "";

        if (this.state.details_saved) {
            display = this.state.details_saved.map((post) => {
                return (
                    <ShowSavedPost details={post} />
                );
            })
        }
        else {
            msg = "No saved post";
        }
        if (this.state.redirectVar && msg == "") {
            return (
                <div className="bg_relative">
                    <Header />
                    {display}
                </div>
            );
        }
        else if (this.state.redirectVar && msg != "") {
            return (
                <div className="bg_relative">
                    <Header />
                    <div className="d-flex justify-content-center text-light">
                        <h1>{msg}</h1>
                    </div>
                </div>
            );
        }
        return (
            <div className="bg_relative">
                <Header />
                {/* <ShowBreadcrumb /> */}
            </div>
        );
    }
}

export default SavedPost;