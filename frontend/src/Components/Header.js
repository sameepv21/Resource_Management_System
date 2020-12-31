import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse, Nav, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isDropdownOpen: false,
            data: {},
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentDidMount(){
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/profile')
            .then(response => {
                this.setState({
                    data: JSON.parse(response.data.data),
                })
            })
            .catch(response => {
                alert(response);
            })
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen,
        });
    }

    handleToggle() {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen,
        });
    }

    render() {
        return(
            <Navbar className="color-nav sticky-top" dark expand="md">
                <div className="container">
                    <NavbarBrand className="mr-auto" href="/"><small>Resource Management System</small></NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar className="dark">
                        <Nav navbar className="ml-auto">
                            <NavItem className="mt-1">
                                <NavLink className="nav-link" to='/home'>
                                    <span className="fa fa-home fa-lg mr-2"></span>Home
                                </NavLink>
                            </NavItem>
                            <NavItem className="mt-1">
                                <NavLink className="nav-link" to='/newPost'>
                                    <span className="fa fa-plus fa-lg mr-2 mt-1"></span>New Post
                                </NavLink>
                            </NavItem>
                            <NavItem className="mt-1">
                                <NavLink className="nav-link" to='/home'>
                                    <span className="fa fa-info fa-lg mr-2"></span>About Us
                                </NavLink>
                            </NavItem>
                            <NavItem className="mt-1">
                                <NavLink className="nav-link" to='/contactUs'>
                                    <span className="fa fa-phone fa-lg mr-2"></span>Contact Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.handleToggle}>
                                    <DropdownToggle style={{backgroundColor: "black", borderColor: "black"}} className="mt-1">
                                        <img src={this.state.data.imageUrl} className="rounded-circle mr-2" width="35px" height="35px"></img>
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
                            </NavItem>
                        </Nav>  
                    </Collapse>
                </div>
            </Navbar>
        );
    }

}

export default Header;