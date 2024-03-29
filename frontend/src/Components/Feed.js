import React, { Component, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Modal, ModalHeader, ModalBody, CardImgOverlay, CardHeader, CardFooter, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import NoPosts from './NoPosts';
import { motion } from 'framer-motion';
import { pageVariants } from '../Shared/PageVariants';


function ShowPosts({ result }) {

    const [isDropdownOpen, changeisDropdownOpen] = useState(false);
    const [isModalOpen, changeisModalOpen] = useState(false);
    const [successMsg, changeSuccessMsg] = useState('');

    function addToSavePosts(event) {
        event.preventDefault();
        let data = {
            id: event.target.id,
        }

        axios.defaults.withCredentials = true;
        axios.post('/addToSavedPosts', data)
            .then((response) => {
                if(response.data.success) {
                    changeSuccessMsg('Saved')
                }
                else {
                    changeSuccessMsg('Already Saved!');
                }
            })
            .catch((response) => {
                alert('Something went wrong, please try again later!');
            })
    }

    var display = result.map((post) => {
        let displayURL;
        if (post.url) {
            displayURL = <div className="mt-2"><strong>Want to view the site? </strong><a href={post.url} className="text-decoration-none">Click Me</a></div>
        }
        let displayFile;
        if(post.file_name) {
            displayFile = <a href={post.file_name} role="button" className="btn m-1" color="success" download>Download<span className="ml-2 fa fa-download"></span></a>
        }
        return (
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
                <div className="d-flex justify-content-center">
                    <div className="col-md-6">
                        <Card className="mb-3 mt-1">
                            <CardHeader style={{ backgroundColor: "black", borderColor: "black" }}>
                                <div className="d-flex justify-content-center text-light">
                                    <h3>{post.title}</h3>
                                </div>
                            </CardHeader>
                            <CardBody className="bg-white">
                                <strong> Description: </strong>{post.description}<br />
                                {displayURL}
                            </CardBody>
                            <CardFooter className="bg-white">
                                <div className="d-flex justify-content-center">
                                    <div>
                                        <h6 className="d-flex justify-content-start text-small" style={{ textColor: "grey" }}>{post.fname} {post.lname}</h6>
                                        <h6 className="text-small">{post.date_time}</h6>
                                    </div>
                                    {displayFile}
                                    <Button id={post.idposts} className="btn m-1 ml-auto" color="primary" onClick={addToSavePosts}>Save<span className="ml-2 fa fa-bookmark"></span></Button>
                                    {/* <p className="text-success ml-2 mt-2">{successMsg}</p> */}
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </motion.div>
        );
    })

    return (display);
}

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
        }
    }
    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:5000/getFeed", { 'headers': { 'stream': this.props.stream } })
            .then((posts) => {
                this.setState({
                    result: posts.data.data,
                })
            })
    }
    render() {
        if (this.state.result.length === 0) {
            return (
                <div className="bg_fixed">
                    <Header />
                    <NoPosts />
                </div>
            );
        } else {
            return (
                <div className="bg_relative">
                    <Header />
                    <ShowPosts result={this.state.result} />
                </div>
            )
        }

    }
}

export default Feed;
