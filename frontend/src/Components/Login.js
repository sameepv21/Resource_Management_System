import React, {Component} from 'react';
import {Navbar, NavItem, Nav, Collapse, NavbarToggler, NavbarBrand, Form, FormGroup, Input, Card, Button, CardBody,Label, Modal, ModalHeader, ModalBody, CardHeader, FormFeedback} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Verify from './Verify';
import cookie from 'react-cookies';
import GoogleLogin from 'react-google-login';

class LoginForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            firstname: '',
            lastname: '',
            roll: '',
            email: '',
            password: '',
            confirmPassword: '',
            redirectVar: false,
            redirectVarSignUp: false,
            google: false,
            otp: '',
            touched: {
                firstname: false,
                lastname: false,
                roll: false,
                email: false,
                password: false,
                confirmPassword: false,
            }
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handlerBlur = this.handlerBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj.email);
        let data = {
            google: true,
            email: response.profileObj.email,
        }

        axios.post("http://localhost:5000/login", data)
            .then((response) => {
                if(response.data.success){
                    cookie.save("cookie", response.data.data.email, {path: '/'});
                    this.setState({
                        redirectVar: true,
                    })
                }
            })
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen,
        });
    }

    componentDidMount() {
        if(cookie.load("cookie")){
            this.setState({
                redirectVar: true,
            });
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    handlerBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true},
        });
    }

    handleInputChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    async handleSignUpSubmit(event) {
        event.preventDefault();
        this.setState({
            redirectVarSignUp: true,
        });

        let data = {
            email: this.state.email,
        }

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/verify', data)
            .then(response => {
                if(response.data.success) {
                    this.setState({
                        google: false,
                        redirectVarSignUp: true,
                        otp: response.data.data.otp,
                    });
                }
            });
    }

    async handleLoginSubmit(event) {
        let data = {
            email: this.state.email,
            password: this.state.password,
        }

         axios.post('http://localhost:5000/login', data)
             .then(response => {
                 if(response.data.success) {
                    cookie.save("cookie", response.data.data.email, {path: '/'})
                     this.setState({
                         redirectVar: true,
                     });
                 } else {
                     alert(response.data.msg);
                 }
             });
    }

    validate(firstname, lastname, roll, email, password, confirmPassword) {
        let errors = {
            firstname: '',
            lastname: '',
            roll: '',
            email: '',
            password: '',
            confirmPassword: '',
        }

        if(this.state.touched.firstname && firstname.length < 3) {
            errors.firstname = 'First name should be greater than 2 characters';
        } else if(this.state.touched.firstname && firstname.length > 10) {
            errors.firstname = 'First name should be less than 11 characters';
        } 
        
        if(this.state.touched.lastname && lastname.length < 3) {
            errors.lastname = 'Last Name should be greater than 2 characters';
        } else if(this.state.touched.lastname && lastname.length > 10) {
            errors.lastname = 'Last Name should be less than 11 characters';
        }

        let reg = /^\d+$/;
        if(this.state.touched.roll && !reg.test(roll)) {
            errors.roll = 'Roll number should be a number only.'
        } else if(roll.length !== 7 && this.state.touched.roll) {
            errors.roll = 'Roll number should be exactly 7 numbers.'
        }

        if(this.state.touched.email && email.split('@').filter(x => x === 'ahduni.edu.in').length !== 1) {
            errors.email = 'Email should contain @ahduni.edu.in';
        }

        if(this.state.touched.password && password.length < 8) {
            errors.password = 'Length of password should be >= 8.'
        }

        if(this.state.touched.password && this.state.touched.confirmPassword && password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        return errors;

    }

    render() {
        let errors = this.validate(this.state.firstname, this.state.lastname, this.state.roll, this.state.email, this.state.password, this.state.confirmPassword)
        if(this.state.redirectVar) {
            return(
                <Redirect to="/home" />
            );
        } else if(this.state.redirectVarSignUp) {
            return(
                <Verify data={this.state} />
            );
        } else {
            return(
                <div>
                    <Navbar className="color-nav" dark expand="sm">
                        <div className="container">
                            <NavbarBrand>Resource Management System</NavbarBrand>
                            <NavbarToggler onClick={this.toggleNav} />
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar className="ml-auto">
                                    <NavItem>
                                        <Button color="bg-dark text-light" onClick={this.toggleModal}>
                                            <span className="fa fa-user fa-lg mr-2"></span>Sign Up
                                        </Button>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                    <div className="bg_fixed">
                        <div className="d-flex justify-content-center">
                            <Card className="mb-5 mt-5">
                                <CardHeader>
                                    <div className="container d-flex justify-content-center">
                                        <h3>Get all Resources to Learn at One Place</h3>
                                    </div>
                                    <div className="container d-flex justify-content-center">
                                        <p>Stop Wasting Time... Here's what you need to know</p>
                                    </div>
                                </CardHeader>
                                <CardBody className="color-nav">
                                    <Form method="post">
                                        <FormGroup>
                                            <Label htmlFor="email" className="text-light">Email</Label>
                                            <Input type="text" onChange={this.handleInputChange} id="email" pattern="[a-z0-9._%+-]+@ahduni+.edu+.in" name="email" placeholder="Email" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="password" className="text-light">Password</Label>
                                            <Input type="password" onChange={this.handleInputChange} id="password" name="password" placeholder="Password" />
                                        </FormGroup>
                                        <FormGroup className="d-flex justify-content-center">
                                            <GoogleLogin
                                            clientId="671959910473-q5vu4qnig20dkibffi718pha5vcsjvn2.apps.googleusercontent.com"
                                            buttonText="Login" onSuccess={this.responseGoogle} onFaliure={this.responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                            ></GoogleLogin>
                                        </FormGroup>
                                        <div className="d-flex justify-content-center">
                                            <Button type="button" onClick={this.handleLoginSubmit} color="success"><span className="fa fa-sign-in fa-lg mr-2"></span> Login</Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Sign Up</ModalHeader>
                        <Card>
                            <CardBody className="color-nav ml-3 mr-3 mb-3">
                                <ModalBody>
                                    <Form method="post">
                                        <FormGroup>
                                            <Label className="text-light" htmlFor="firstname">First Name</Label>
                                            <Input type="text" name="firstname" id="firstname" 
                                                value={this.state.firstname} onBlur={this.handlerBlur('firstname')} 
                                                valid={errors.firstname === ''} invalid={errors.firstname !== ''}
                                                placeholder="First Name" onChange={this.handleInputChange} />
                                            <FormFeedback>{errors.firstname}</FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="text-light" htmlFor="lastname">Last Name</Label>
                                            <Input type="text" name="lastname" id="lastname" 
                                                value={this.state.lastname} onBlur={this.handlerBlur('lastname')} 
                                                valid={errors.lastname === ''} invalid={errors.lastname !== ''}
                                                placeholder="Last Name" onChange={this.handleInputChange} />
                                                <FormFeedback>{errors.lastname}</FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="text-light" htmlFor="roll">AU Roll Number</Label>
                                            <Input type="number" name="roll" id="roll" 
                                                value={this.state.roll} onBlur={this.handlerBlur('roll')} 
                                                valid={errors.roll === ''} invalid={errors.roll !== ''}
                                                placeholder="AU Roll Number" onChange={this.handleInputChange} />
                                                <FormFeedback>{errors.roll}</FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="text-light" htmlFor="email">Email</Label>
                                            <Input type="email" name="email" id="email" 
                                                value={this.state.email} onBlur={this.handlerBlur('email')} 
                                                valid={errors.email === ''} invalid={errors.email !== ''}
                                                placeholder="Email" onChange={this.handleInputChange} />
                                                <FormFeedback>{errors.email}</FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="text-light" htmlFor="password">Password</Label>
                                            <Input type="password" name="password" id="password" 
                                                value={this.state.password} onBlur={this.handlerBlur('password')} 
                                                valid={errors.password === ''} invalid={errors.password !== ''}
                                                placeholder="Password" onChange={this.handleInputChange} />
                                                <FormFeedback>{errors.password}</FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="text-light" htmlFor="confirmPassword">Confirm Password</Label>
                                            <Input type="password" name="confirmPassword" id="confirmPassword" 
                                                value={this.state.confirmPassword} onBlur={this.handlerBlur('confirmPassword')} 
                                                valid={errors.confirmPassword === ''} invalid={errors.confirmPassword !== ''}
                                                placeholder="Confirm Password" onChange={this.handleInputChange} />
                                                <FormFeedback>{errors.confirmPassword}</FormFeedback>
                                        </FormGroup>
                                        <div className="d-flex justify-content-center">
                                            <Button type="button" onClick={this.handleSignUpSubmit} value="submit" color="success"><span className="fa fa-user fa-lg mr-1"></span> Sign Up</Button>
                                        </div>
                                    </Form>
                                </ModalBody>
                            </CardBody>
                        </Card>
                    </Modal>
                    </div>
                </div>
            );
        }
    }
}

export default LoginForm;