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
            TEMP: false,
            loginEmailError: '',
            loginPasswordError: '',
            loginError: '',
            isNavOpen: false,
            isModalOpen: false,
            firstname: '',
            lastname: '',
            roll: '',
            email: '',
            redirectVar: false,
            redirectVarSignUp: false,
            google: false,
            otp: '',
            standardSignUpError: '',
            responseMsg: '',
            touched: {
                firstname: false,
                lastname: false,
                roll: false,
                email: false,
            }
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handlerBlur = this.handlerBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle = (response) => {
        // alert(JSON.stringify(response.profileObj));
        let data = {
            google: true,
            email: response.profileObj.email,
            imageUrl: response.profileObj.imageUrl,
        }

        axios.post("http://localhost:5000/login", data)
            .then((response) => {
                if(response.data.success){
                    cookie.save("cookie", response.data.data.email, {path: '/'});
                    this.setState({
                        redirectVar: true,
                    })
                } else {
                    alert(JSON.stringify(response.data.msg));
                }
            })
            .catch((response) => {
                alert(response.msg);
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
        this.setState({
            standardSignUpError: '',
            responseMsg: '',
        });
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    async handleSignUpSubmit(event) {
        // alert(this.state.firstname.length)
        if(this.state.firstname.length < 3 || this.state.lastname.length < 3 || this.state.roll.length < 3 || this.state.email.length === 0 ) {
            this.setState({
                TEMP: true,
                standardSignUpError: "You have not filled all the fields",
            });
            // alert("length123: " + this.state.standardSignUpError + " " + this.state.TEMP);

        }
        if(this.state.standardSignUpError.length == 0) {
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
                    else {
                        alert(JSON.stringify(response.data.msg));
                    }
                })
                .catch(response => {
                    alert('Something went wrong. Please try again later');
                })
        }
    }

    validate(firstname, lastname, roll, email) {
        let errors = {
            firstname: '',
            lastname: '',
            roll: '',
            email: '',
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
        return errors;

    }

    render() {
        let errors = this.validate(this.state.firstname, this.state.lastname, this.state.roll, this.state.email)
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
                            <Card className="mb-5 col-md-4 mt-4 mx-2">
                                <CardHeader className="color-nav">
                                    <div className="container d-flex justify-content-center">
                                        <h3>Get all Resources to Learn at One Place</h3>
                                    </div>
                                    <div className="container d-flex justify-content-center">
                                        <p>Stop Wasting Time... Here's what you need to know</p>
                                    </div>
                                </CardHeader>
                                <CardBody >
                                    <Form method="post">
                                        <div className="d-flex justify-content-center">
                                            <img src="https://res.cloudinary.com/didf23s1x/image/upload/v1609433589/RMS/Login_tjskfe.gif" width="80%" height="80%"/>
                                            </div>
                                        <FormGroup className="d-flex justify-content-center">
                                            <GoogleLogin
                                                clientId="671959910473-q5vu4qnig20dkibffi718pha5vcsjvn2.apps.googleusercontent.com"
                                                buttonText="Login" onSuccess={this.responseGoogle} onFaliure={this.responseGoogle}
                                                cookiePolicy={'single_host_origin'}
                                                hostedDomain="ahduni.edu.in"
                                                // className="bg-success"
                                                render={renderProps => (
                                                    <Button color="success" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login With Google</Button>
                                                )}
                                            />
                                        </FormGroup>
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
                                        <p className="text-danger d-flex justify-content-center">{this.state.standardSignUpError}</p>
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