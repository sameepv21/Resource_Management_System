import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse, Nav, Dropdown, Input, DropdownToggle, Button, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
let redirectVarMain = false;
let redirectToMain = "";
class Name extends Component {

    render() {
        return (
            <li className="text-light" id={this.props.name}
                role="button"
                onClick={() => {
                    console.log("clicked "+this.props.name)
                    redirectVarMain= true;
                    redirectToMain = this.props.name; 
                }}>
                        {this.props.name}
            </li>
        )
    }
}

class SearchList extends Component {
    render() {
        return (
            <ul style={{ maxHeight: 100, overflow: 'auto' }}>
                {this.props.items.map(name => <Name name={name} />)}
            </ul>
        )
    }
}

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            isNavOpen: false,
            isDropdownOpen: false,
            data: {},
            redirectVarTag: false,
            redirectVarName: false,
            searchItems: [],
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleGo = this.handleGo.bind(this);
        this.dynamicSearch = this.dynamicSearch.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    componentDidMount() {
        if (cookie.load("cookie")) {
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
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
            searchItems: []
        });

    }
    handleFocus = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
            searchItems: ["Aneri", "Sameep", "Jhil", "Nirja", "Drishti", "Anu", "#brute", "#tree"]
        });

    }

    handleInputChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            search: value
        });
    }

    handleGo() {
        if (this.state.search == "") {
            alert("No input");
        } else {
            if (this.state.search.charAt(0) == '#') {
                this.setState({
                    redirectVarTag: true,
                });
            }
            else {
                this.setState({
                    redirectVarName: true,
                });
            }
        }
    }
    dynamicSearch() {
        return this.state.searchItems.filter(searchItems => searchItems.toLowerCase().includes(this.state.search.toLowerCase()));
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

        if(redirectVarMain){
            alert("got redirect var" + redirectToMain);
            if (redirectToMain.charAt(0) == '#') {
                alert("gotcha!!!");
                return (
                    <Redirect to={`/searchTag/${redirectToMain.substring[1, redirectToMain.length]}`} />
                )
            }
            else {
                return (
                    <Redirect to={`/searchName/${redirectToMain}`} />
                )
            }
        }
        if (this.state.redirectVarName) {
            return (
                <Redirect to={`/searchName/${this.state.search}`} />
            )
        }
        if (this.state.redirectVarTag) {
            return (
                <Redirect to={`/searchTag/${this.state.search.substring[1, this.state.search.length]}`} />
            )
        }
        return (
            <Navbar className="color-nav sticky-top" dark expand="lg">
                <div className="container">
                    <NavbarBrand className="mr-auto" href="/">Resource Management System</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar className="dark">
                        <Nav navbar className="ml-auto">
                            <NavItem className="mt-2">
                                <input type="text" placeholder="Search" id="search"
                                    onBlur={this.handleBlur("search")}
                                    onFocus={this.handleFocus("search")}
                                    onChange={this.handleInputChange}>
                                </input>
                                <SearchList items={this.dynamicSearch()} />
                            </NavItem>
                            <NavItem>
                                <Button className="btn-sm btn mt-2" style={{ backgroundColor: "#0F4756" }} onClick={this.handleGo}>Go</Button>
                            </NavItem>
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
                                <NavLink className="nav-link" to='/aboutUs'>
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
                                    <DropdownToggle style={{ backgroundColor: "black", borderColor: "black" }} className="mt-1">
                                        <img src={this.state.data.imageUrl} className="rounded-circle mr-2" style={{ height: "38px", width: "38px" }} ></img>
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