import axios from 'axios';
import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import cookie from 'react-cookies';
import Header from './Header';
import { Redirect } from 'react-router-dom';
import { pageVariants } from '../Shared/PageVariants';
import { motion } from 'framer-motion';

class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msg: '',
            successMsg: '',
            errorMsg: '',
            redirectLogin: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (!cookie.load("cookie")) {
            this.setState({ redirectLogin: true });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = {
            msg: this.state.msg
        }
        console.log(this.state.msg.length);
        if (this.state.msg.length < 10) {
            this.setState({
                errorMsg: 'Message length too short',
            });
        }
        else {
            axios.defaults.withCredentials = true;
            axios.post("http://localhost:5000/feedback", data)
                .then((response) => {
                    if (response.data.success) {
                        this.setState({
                            successMsg: 'Your message has been sent!',
                        });
                    } else {
                        alert(response.data.msg)
                    }
                })
        }
    }

    handleInputChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        this.setState({
            [name]: value,
            successMsg: '',
            errorMsg: '',
        });
        // console.log('state: ' + JSON.stringify(this.state));
    }

    render() {
        if (this.state.redirectLogin) {
            return (
                <Redirect to='/login' />
            );
        }
        return (
                <div className="bg_relative">
                    <Header />
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
                    <div className="d-flex justify-content-center mb-3 mx-auto">
                        <div className="col-md-6 mt-5">
                            <Card className="shadow-black mb-3">
                                <div className="background-red">
                                    <CardHeader style={{ border: "white" }} style={{ backgroundColor: "black" }}><div className="d-flex justify-content-center text-light"><h3>Your message is valuable</h3></div></CardHeader>
                                </div>
                                <div className="row">
                                    <img src="https://res.cloudinary.com/didf23s1x/image/upload/v1609433588/RMS/ContactUs_ifporj.gif" className="mx-auto col-md-7" style={{width: "60%"}} />
                                    <CardBody className="mt-3 mr-3 ml-3 ">
                                        <Form>
                                            <FormGroup>
                                                <Label htmlFor="email">Email</Label>
                                                <Input type="email" name="email" value={cookie.load("cookie").email} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="msg">Message/ Feedback</Label>
                                                <Input onChange={this.handleInputChange} type="textarea" rows="6" name="msg" placeholder="Your text goes here" />
                                            </FormGroup>
                                            <p className="d-flex justify-content-center text-success"><strong>{this.state.successMsg}</strong></p>
                                            <p className="d-flex justify-content-center text-danger"><strong>{this.state.errorMsg}</strong></p>
                                            <div className="d-flex justify-content-center">
                                                <Button type='button' className="btn btn-success" onClick={this.handleSubmit}>Send</Button>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </div>
                            </Card>
                        </div>
                    </div>
            </motion.div>
                </div>
        );
    }
}

export default ContactUs;
