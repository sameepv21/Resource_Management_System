import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse, Nav, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isDropdownOpen: false,
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
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
            <Navbar className="color-nav" dark expand="md">
                <div className="container">
                    <NavbarBrand className="mr-auto" href="/">Resource Management System</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar className="dark">
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink className="nav-link" to='/home'>
                                    <span className="fa fa-home fa-lg mr-2"></span>Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.handleToggle}>
                                    <DropdownToggle style={{backgroundColor: "black", borderColor: "black"}}><span className="fa fa-user fa-lg mr-2"></span>Profile<i className="fa fa-caret-down ml-1" /></DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <NavLink className="nav-link text-dark text-decoration-none" to='/profile'>Account</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="nav-link text-dark text-decoration-none" to='/savedPosts'>Saved Posts</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="nav-link text-dark text-decoration-none" to='/changePassword'>Change Password</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="nav-link text-dark text-decoration-none" to='/userPosts'>Your Posts</NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/newPost'>
                                    <span className="fa fa-plus fa-lg mr-2"></span>New Post
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/logout'>
                                    <span className="fa fa-sign-out fa-lg mr-2"></span>Sign Out
                                </NavLink>
                            </NavItem>
                        </Nav>  
                    </Collapse>
                </div>
            </Navbar>
        );
    }

}

export default Header;