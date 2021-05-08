import React, { Component, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardImgOverlay, CardHeader, CardFooter, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import NoPosts from './NoPosts';
import { motion } from 'framer-motion';
import { pageVariants } from '../Shared/PageVariants';


function ShowPosts({ result }) {

    const [isDropdownOpen, changeisDropdownOpen] = useState(false);

    function handleToggle() {
        changeisDropdownOpen(!isDropdownOpen);
    }
    var display = result.map((post) => {
        let displayURL;
        if (post.url) {
            displayURL = <div>Reference: <a href={post.url} className="text-decoration-none">Click Here</a></div>
        }
        return (
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
                <div className="d-flex justify-content-center">
                    <Card className="col-md-6 mb-2">
                        <CardHeader className="bg-white">
                            <div className="d-flex justify-content-center">
                                <h3>{post.title}</h3>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Dropdown isOpen={isDropdownOpen} toggle={handleToggle}>
                                    <DropdownToggle>HEY
                                <i className="fa fa-caret-down ml-1" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <NavLink className="nav-link text-dark text-decoration-none" to='/profile'>Account</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="nav-link text-dark text-decoration-none" to='/savedPosts'>Saved Posts</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="nav-link text-dark text-decoration-none" to='/userPosts'>Your Posts</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="nav-link text-dark text-decoration-none" to='/logout'>Sign Out</NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </CardHeader>
                        <CardBody>
                            Description: {post.description}<br />
                            {displayURL}
                        </CardBody>
                        <div className="d-flex justify-content-center">
                            <CardFooter className="bg-white">
                                <a href={post.file_name} role="button" className="btn m-1" color="success" download>Download<span className="ml-2 fa fa-download"></span> </a>
                                <Button className="btn m-1" color="primary">Save<span className="ml-2 fa fa-bookmark"></span></Button>
                            </CardFooter>
                        </div>
                    </Card>
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
        // console.log(JSON.stringify(this.state));
        if (this.state.result === null) {
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
