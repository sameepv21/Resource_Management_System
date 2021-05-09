import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, Card, CardHeader, FormFeedback } from 'reactstrap';
import axios from 'axios';
import Header from './Header';
import cookie from 'react-cookies';
import { motion } from 'framer-motion';
import { pageVariants } from '../Shared/PageVariants';


class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            roll: '',
            redirectVar: false,
            redirectLogin: false,
            touched: {
                firstName: false,
                lastName: false,
                roll: false,
            },
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlerBlur = this.handlerBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlerBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit() {
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            roll: this.state.roll,
        }

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/editProfile', data)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        redirectVar: true,
                    });
                }
                else {
                    alert(response.data.msg)
                }
            })
            .catch((err) => {
                alert('Something went wrong. Please try again later!');
            })
    }

    validate(firstName, lastName, roll) {
        const errors = {
            firstName: '',
            lastName: '',
            roll: '',
        }

        if (this.state.touched.firstName && firstName.length < 3) {
            errors.firstName = 'First name should be greater than 2 characters';
        } else if (this.state.touched.firstName && firstName.length > 10) {
            errors.firstName = 'First name should be less than 11 characters';
        }

        if (this.state.touched.lastName && lastName.length < 3) {
            errors.lastName = 'Last Name should be greater than 2 characters';
        } else if (this.state.touched.lastName && lastName.length > 10) {
            errors.lastName = 'Last Name should be less than 11 characters';
        }

        if (this.state.touched.roll && roll.length !== 7) {
            errors.roll = "Roll Number should be of exactly 7 digits"
        }

        return errors;
    }

    componentDidMount() {
        if (!cookie.load("cookie")) {
            this.setState({ redirectLogin: true });
        } else {
            this.setState({
                firstName: this.props.data.firstName,
                lastName: this.props.data.lastName,
                roll: this.props.data.roll,
            });
        }
    }

    render() {
        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.roll);
        if (this.state.redirectVar) {
            return (
                <Redirect to='/profile' />
            );
        } else {
            return (
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
                    <div className="my-5 d-flex justify-content-center" >
                        <div className="col-lg-4">
                            <Card>
                                <CardHeader style={{ border: "white" }} style={{ backgroundColor: "black" }}><div className="d-flex justify-content-center text-light"><h3>Edit Profile</h3></div></CardHeader>
                                <Form className="m-5 row">
                                    <div className="col-md-7">
                                        <img className="col-md-12" src='https://res.cloudinary.com/didf23s1x/image/upload/v1609433588/RMS/EditProfile_e2fjqw.gif' />
                                    </div>
                                    <div className="col-md-5 mt-3">
                                        <FormGroup>
                                            <Label htmlFor='firstName'>First Name</Label>
                                            <Input type="text" id="firstName" name="firstName"
                                                onBlur={this.handlerBlur('firstName')} valid={errors.firstName === ''}
                                                invalid={errors.firstName !== ''} onChange={this.handleInputChange}
                                                value={this.state.firstName} />
                                            <FormFeedback>{errors.firstName}</FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor='lastName'>Last Name</Label>
                                            <Input type="text" id="lastName" name="lastName"
                                                onBlur={this.handlerBlur('lastName')} valid={errors.lastName === ''}
                                                invalid={errors.lastName !== ''} onChange={this.handleInputChange}
                                                value={this.state.lastName} />
                                            <FormFeedback>{errors.lastName}</FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor='roll'>AU Roll Number</Label>
                                            <Input type="number" id="roll" name="roll"
                                                onBlur={this.handlerBlur('roll')} valid={errors.roll === ''}
                                                invalid={errors.roll !== ''} onChange={this.handleInputChange}
                                                value={this.state.roll} />
                                            <FormFeedback>{errors.roll}</FormFeedback>
                                        </FormGroup>
                                        <div className="d-flex justify-content-center">
                                            <Button onClick={this.handleSubmit} type='button' color="success">
                                                <span className="fa fa-check mr-2"></span>
                                        Save
                                    </Button>
                                        </div>
                                    </div>
                                </Form>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            );
        }
    }
}

export default EditProfile;