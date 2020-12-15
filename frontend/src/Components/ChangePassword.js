import axios from 'axios';
import React,{Component} from 'react';
import {Card, CardImg, CardBody, CardImgOverlay, CardHeader, CardFooter, Button, Form, Input, Label, FormGroup} from 'reactstrap';
import Header from './Header';
import ShowBreadcrumb from './ShowBreadcrumb';

class ChangePassword extends Component{

    constructor(props){

        super(props);

        this.state = {
            change : "",
            confirmChange: "",
            verifyPassword: "",
            authorised : false,
            incorrectPassword: false,
            success: false,
            changedSuccessfully: false
        }

        this.change = this.change.bind(this);
        this.verify = this.verify.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    /*validate(password, confirmPassword) {
        let errors = {
            password: '',
            confirmPassword: '',
        }
        if(password.length < 8) {
            errors.password = 'Length of password should be >= 8.'
        }

        if(this.state.touched.confirmPassword && password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        return errors;

    }*/

    handleSubmit(){
        let data ={
            newPassword: this.state.change,
            oldPassword: this.state.verifyPassword
        }
        axios.default.withCredentias = true;
        axios.post("http://localhost:5000/changePassword", data)
            .then((response) => {
                console.log(response.data);
                if(response.data.success){
                    this.setState({
                        changedSuccessfully: true
                    })
                    alert(response.data.msg);
                } else{
                    alert(response.data.msg);
                }
            })
    }

    handleNext(){
        let data = {
            currentPassword: this.state.verifyPassword,
        }

        axios.defaults.withCredentials = true;
        axios.post("http://localhost:5000/verifyChangePassword", data)
            .then(response => {
                if(response.data.success){
                    this.setState({
                        authorised: true
                    })
                }
                else{
                    this.setState({
                        incorrectPassword: true,
                    })
                    alert(response.data.msg);
                }
            })
    }

    handleInputChange(event){
        let target = event.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value,
        });
        console.log('state is: ' + JSON.stringify(this.state));
        console.log('Name and value is: ' + name + " " + value);
    }       

    change(){
        return(
            <div className="container mt-5" style={{width: "50%"}}>
                <br/><br/><br/><br/>
                    <Card>
                        <CardHeader className= "text-dark d-flex justify-content-center">
                            <h4>You are authenticated to change your password :)</h4>
                        </CardHeader>
                        <CardBody className="color-nav">
                            <Form className="m-3">
                                    <Label htmlfor="change" className="text-light">Enter new password</Label>
                                    <Input type="password" id="change" name="change" onChange={this.handleInputChange}/>
                                    <Label htmlfor="confirmChange" className="text-light">Confirm password</Label>
                                    <Input type="password" id="confirmChange" name="confirmChange" onChange={this.handleInputChange}/>
                                    <div className="d-flex justify-content-center mt-3">
                                        <Button onClick={this.handleSubmit} type='button' color="success">
                                            <span className="fa fa-check mr-2"></span>
                                            Change 
                                        </Button>
                                    </div>
                            </Form>
                        </CardBody>
                    </Card>
                    <br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/>
                </div>
        );
    }

    verify(){
        return(
            <div className="container mt-5" style={{width: "37%"}}>
                <br/><br/><br/><br/><br/><br/>
                <Card className="mb-5 mt-2">
                    <CardHeader className= "text-dark d-flex justify-content-center">
                        <h4>Verify its you <span className="fa fa-check-square-o ml-2"></span></h4>
                    </CardHeader>
                    <CardBody className="color-nav">
                        <FormGroup>
                            <Label htmlFor="title" className="text-light">Enter your current password:</Label><br/>
                            <Input type="password" id="verifyPassword" name="verifyPassword" onChange={this.handleInputChange}/>
                        </FormGroup>
                            <div className="d-flex justify-content-center mt-3">
                                <Button onClick={this.handleNext} type='button' color="success">
                                    Next <span className="fa fa-long-arrow-right ml-2"></span>
                                </Button>
                            </div>
                    </CardBody>
                </Card>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        );
    }

    render(){
        var currentPassword;
        if(this.state.success){
            alert("Password changed successfully");
        } else if(this.state.authorised){
            return(
                <div className="bg">
                    <Header />
                    {this.change()}
                </div>
            )            
        } else if(this.state.incorrectPassword){
            alert("Incorrect Password");
        } else if(this.state.changedSuccessfully){

        }
        return(
            <div className="bg">
                <Header />
                {this.verify()}
            </div>
        )
    }   
}

export default ChangePassword;