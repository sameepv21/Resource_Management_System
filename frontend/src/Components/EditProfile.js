import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, FormFeedback } from 'reactstrap';
import Header from './Header';

class EditProfile extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            firstName: '',
            lastName: '',
            redirectVar: false,
            touched: {
                firstName: false,
                lastName: false,
            },
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlerBlur = this.handlerBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    async handleSubmit() {
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        }
        const options = {
            method: "POST",
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        const updated = await fetch('/editProfile', options);
        const response = await updated.json();
        if(response.success) {
            this.setState({
                redirectVar: true,
            });
        }
    }

    validate(firstName, lastName) {
        const errors = {
            firstName: '',
            lastName: '',
        }

        if(this.state.touched.firstName && firstName.length < 3) {
            errors.firstName = 'First name should be greater than 2 characters';
        } else if(this.state.touched.firstName && firstName.length > 10) {
            errors.firstName = 'First name should be less than 11 characters';
        } 
        
        if(this.state.touched.lastName && lastName.length < 3) {
            errors.lastName = 'Last Name should be greater than 2 characters';
        } else if(this.state.touched.lastName && lastName.length > 10) {
            errors.lastName = 'Last Name should be less than 11 characters';
        }

        return errors;
    }

    componentDidMount() {
        this.setState({
            firstName: this.props.data.firstName,
            lastName: this.props.data.lastName,
        });
    }

    render() {
        const errors = this.validate(this.state.firstName, this.state.lastName);
        if(this.state.redirectVar) {
            return(
                <Redirect to='/profile' />
            );
        } else {
            return(
                <div className="container">
                    <Form className="mt-5">
                        <div className="d-flex justify-content-center">
                            <img className="col-md-3 col-sm-10 rounded-circle" src="assests/images/sameep.jpg" />
                        </div>
                            <FormGroup>
                                <Label htmlFor='firstName'>First Name</Label>
                                <Input type="text" id="firstName" name="firstName"
                                    onBlur={this.handlerBlur('firstName')} valid={errors.firstName === ''}
                                    invalid={errors.firstName !== ''} onChange={this.handleInputChange}
                                    value={this.state.firstName} />
                                <FormFeedback>{errors.firstName }</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='lastName'>Last Name</Label>
                                <Input type="text" id="lastName" name="lastName"
                                    onBlur={this.handlerBlur('lastName')} valid={errors.lastName === ''}
                                    invalid={errors.lastName !== ''} onChange={this.handleInputChange}
                                    value={this.state.lastName} />
                                <FormFeedback>{errors.firstName }</FormFeedback>
                            </FormGroup>
                            <div className="d-flex justify-content-center">
                                <Button onClick={this.handleSubmit} type='button' color="success">
                                    <span className="fa fa-check mr-2"></span>
                                    Save Changes
                                </Button>
                            </div>
                    </Form>
                </div>
            );
        }
    }
}

export default EditProfile; 