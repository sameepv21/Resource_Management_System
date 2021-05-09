import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Input, Button, Label } from 'reactstrap';
import Header from './Header';
import axios from 'axios';
import cookie from 'react-cookies';
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardTitle';
import CardBody from 'reactstrap/lib/CardBody';
import { motion } from 'framer-motion';
import { pageVariants } from '../Shared/PageVariants';

class Verify extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectVar: false,
            otp: '',
            errorMsg: '',
            touched: {
                otp: false,
            }
        }

        this.handleVerification = this.handleVerification.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlerBlur = this.handlerBlur.bind(this);
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

    async handleVerification() {
        // console.log("state otp is: " + this.state.otp);
        // console.log('props otp is: ' + this.props.data.otp);
        if (this.props.data.otp == this.state.otp) {
            const data = {
                firstname: this.props.data.firstname,
                lastname: this.props.data.lastname,
                roll: this.props.data.roll,
                email: this.props.data.email,
                password: this.props.data.password,
                otp: this.state.otp,
            }

            axios.post('http://localhost:5000/signUp', data)
                .then(response => {
                    cookie.save('cookie', response.data.data.email, { path: '/' });
                    if (response.data.success) {
                        this.setState({
                            redirectVar: true,
                        });
                    }
                })
                .catch(err => {
                    alert('Something went wrong, please try again later!');
                })
        } else {
            this.setState({
                errorMsg: 'Wrong OTP!'
            })
        }
    }

    render() {
        // console.log('Props are: ' + this.props.data.firstname);
        if (this.state.redirectVar) {
            return (
                <Redirect to='/home' />
            );
        } else {
            return (
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
                    <div className="bg_relative ">
                        <div className="d-flex justify-content-center ">
                            <div className="mt-5 col-md-5 col-12">
                                <Card>
                                    <CardHeader className="d-flex justify-content-center color-nav text-light"><h3>OTP</h3></CardHeader>
                                    <img src="https://res.cloudinary.com/didf23s1x/image/upload/v1609509490/RMS/OTPVerify_ds3lrs.gif" />
                                    <CardBody>
                                        <Label htmlFor="otp">Enter the OTP</Label>
                                        <Input className="mb-3" onChange={this.handleInputChange}
                                            id="otp" name="otp"
                                            onBlur={this.handlerBlur('otp')} type='number' />
                                        <Button onClick={this.handleVerification} type="button" className="d-flex justify-content-center" color="success">Verify</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                </motion.div>
            );
        }
    }
}

export default Verify;