// Contains an alert that needs to be handled


import React, {Component} from 'react';
import { FormGroup, Input, Card, Button, CardBody, Label, CardHeader, FormFeedback, CardImg } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: '',
            file: '',
            description: '',
            postId: this.props.details,
            updated: false,
            redirectVar: false,
            canceled: false,
            touched: {
                title: false,
            },
        }

        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        let data = {
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
        }

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/editPost', data)
            .then(response => {
                if(response.data.updated) {
                    this.setState({
                        updated: true,
                    });
                }
            })
            .catch(response => {
                alert(response);
            })
    }

    handleInputChange = (event) => {
        let target = event.target;
        // console.log('The target is: ' + target.value);
        let value;
        if (target.type === 'file') {
            // console.log('The file is: ' + JSON.stringify(target.files));
            value = target.files;
            this.setState({
                file: target.files[0],
            });
            //console.log('this.state is: '+ JSON.stringify(this.state));
        } else {
            value = target.value;
            let name = target.name;

            this.setState({
                [name]: value,
            });
        }

    }

    validate(title) {
        let errors = {
            title: '',
        }

        if (this.state.touched.title && title.length === 0) {
            errors.title = 'Required';
        }

        return errors;
    }

    cancelUpdate() {
        this.setState({
            canceled: true,
        });
    }

    componentDidMount() {
        let post= {
            postId: this.state.postId,
        } 
        axios.post('http://localhost:5000/getEditPost', post)
            .then(response => {
                if(response.data.current) {
                    this.setState({
                        title: response.data.data.title,
                        url: response.data.data.url,
                        description: response.data.data.description,
                    });
                }
            })
            .catch(response => {
                alert(response);
            })
    }


    render() {
        if(this.state.updated || this.state.canceled) {
            return(
                <Redirect to='/userPosts' />
            );
        } else {
            let errors = this.validate(this.state.title);
        return(
            <div>
                <div className="bg_fixed">
                    <div className="d-flex justify-content-center mt-5">
                        <Card className=" mb-5">
                            <CardHeader>
                                <div className="container d-flex justify-content-center">
                                    <h3>Help in sharing resources</h3>
                                </div>
                                <div className="container d-flex justify-content-center">
                                    <p>"No one ever becomes poor by giving" by Anne Frank</p>
                                </div>
                            </CardHeader>
                            <CardBody className="color-nav">
                                <FormGroup>
                                    <Label htmlFor="title" className="text-light">Title</Label>
                                    <Input type="text" id="title" name="title" name="title"
                                        value={this.state.title} onBlur={this.handleBlur('title')}
                                        valid={errors.title === ''} invalid={errors.title !== ''}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.title}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="url" className="text-light">URL</Label>
                                    <Input type="url" id="url" name="url" name="url"
                                        value={this.state.url} onBlur={this.handleBlur('url')} onChange={this.handleInputChange} />
                                </FormGroup>
                                <CardImg src="./demo.jpg" />
                                <FormGroup>
                                    <Label htmlFor="description" className="text-light">Add a Description</Label>
                                    <Input type="textarea" rows="3" id="description" name="description"
                                        value={this.state.description} onBlur={this.handleBlur('description')} onChange={this.handleInputChange} />
                                </FormGroup>
                                <div className="d-flex justify-content-center">
                                    <Button type="button" onClick={this.handleSubmit} color="success">Save</Button>
                                    <Button type="button" className="ml-2" onClick={this.cancelUpdate} color="danger">Cancel</Button>
                                </div>
                                
                            </CardBody>
                        </Card>
                    </div>
                </div>
                </div>
            );   
        }
    }
}

export default EditPost;