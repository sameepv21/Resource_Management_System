// Contains an alert that needs to be handled

import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {Input, Button, Label} from 'reactstrap';
import Header from './Header';
import axios from 'axios';
import cookie from 'react-cookies';
import Card from 'reactstrap/lib/Card';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardBody from 'reactstrap/lib/CardBody';

class Verify extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectVar: false,
            otp: '',
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
            touched: {...this.state.touched, [field]: true},
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
        if(this.props.data.otp == this.state.otp) {
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
                    if(response.data.success) {
                        this.setState({
                            redirectVar: true,
                        });
                    }
                });
        } else {
            alert('Wrong OTP!');
        }
    }

    render() {
        // console.log('Props are: ' + this.props.data.firstname);
        if(this.state.redirectVar) {
            return(
                <Redirect to='/home' />
            );
        } else {
            return(
                <div className="bg_fixed h-100">
                    <div className="d-flex h-100 row justify-content-center align-items-center">
                        <Card className="col-md-3">
                            <CardTitle className="mt-3 d-flex justify-content-center">OTP</CardTitle>
                            <CardBody>
                                <Label htmlFor="otp">Enter the OTP</Label>
                                <Input className="mb-3" onChange={this.handleInputChange}
                                    id="otp" name="otp"
                                    onBlur={this.handlerBlur('otp')} type='number' />
                                <Button onClick={this.handleVerification} type="button" color="success">Verify</Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            );
        }
    }
}

export default Verify;