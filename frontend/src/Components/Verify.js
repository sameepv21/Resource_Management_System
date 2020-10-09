import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {Input, Button, Label} from 'reactstrap';
import Header from './Header';

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
        console.log("state otp is: " + this.state.otp);
        console.log('props otp is: ' + this.props.data.otp);
        if(this.props.data.otp == this.state.otp) {
            const data = {
                firstname: this.props.data.firstname,
                lastname: this.props.data.lastname,
                roll: this.props.data.roll,
                email: this.props.data.email,
                password: this.props.data.password,
                otp: this.state.otp,
            }
    
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
    
            const responseSignUp = await fetch('/signUp', options);
            const dataResponse = await responseSignUp.json();
            if(dataResponse.success) {
                this.setState({
                    redirectVar: true,
                });
                console.log("Successfull");
            }
        } else {
            console.log('Wrong OTP!');
        }
    }

    render() {
        console.log('Props are: ' + this.props.data.firstname);
        if(this.state.redirectVar) {
            return(
                <Redirect to='/home' />
            );
        } else {
            return(
                <div>
                    <Header />
                    <div className="container">
                        <Label htmlFor="otp">OTP</Label>
                        <Input className="mt-3 mb-3" onChange={this.handleInputChange}
                            id="otp" name="otp"
                            onBlur={this.handlerBlur('otp')} type='number' />
                        <Button onClick={this.handleVerification} type="button" color="success">Verify</Button>
                    </div>
                </div>
            );
        }
    }
}

export default Verify;