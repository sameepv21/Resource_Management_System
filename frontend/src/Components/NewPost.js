import React, { Component } from 'react';
import { Form, FormGroup, Input, Card, Button, CardBody, Label, DropdownToggle, CardHeader, FormFeedback } from 'reactstrap';
import Header from './Header';
import axios from 'axios';
import { motion } from 'framer-motion';
import {pageVariants} from '../Shared/PageVariants';

class NewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            url: '',
            file: '',
            school: 'seas',
            stream: 'cse',
            description: '',
            redirectVar: false,
            standardError: '',
            touched: {
                title: false,
            },
        }

        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    async handleSubmit(event) {
        if(this.state.title === '' || (this.state.url === '' || !this.state.file)) {
            this.setState({
                standardError: 'You have not added title and either of url or file',
            });
        }
        if(this.state.standardError === '') {
            event.preventDefault();
            let formData = new FormData();
            formData.append('school', this.state.school);
            formData.append('title', this.state.title);
            formData.append('url', this.state.url);
            formData.append('description', this.state.description);
            formData.append('file', this.state.file);
            formData.append('stream', this.state.stream);

            axios.defaults.withCredentials = true;
            axios.post('http://localhost:5000/uploadPost', formData)
                .then((response) => {
                    alert(JSON.stringify(response.data.msg));
                })
                .catch((err) => {
                    alert(err);
                })
        }
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
            if(name === 'title') {
                this.setState({
                    standardError: '',
                });
            }
            // console.log('name is: ' + name);
            this.setState({
                [name]: value,
            });
            // console.log("school=" + this.state.school);
        }

    }

    validate(title, school) {
        let errors = {
            title: '',
            schoolOption: '',
        }

        if (this.state.touched.title && title.length === 0) {
            errors.title = 'Required';
        }

        if(school == "chooseSchool") {
            errors.schoolOption = 'Please Choose this field';
        }

        return errors;
    }

    render() {
        // console.log(this.state.school);
        const pageVariants = {
            initial: {
              x: "-100vw",
            },
            in: {
              x: 0,
            },
            out: {
              x: "100vw",
            }
          };
        let errors = this.validate(this.state.title, this.state.school);
        let streamVar;
        if(this.state.school === "seas") {
            streamVar = <FormGroup>
                <Label htmlFor="title" className="text-light">Choose stream</Label><br/>
                <select name="stream" style={{width: "100%"}} id= "stream" onBlur={this.handleInputChange}>
                    <option value="cse">Computer Science and Engineering</option>
                    <option value="ce">Chemical Engineering</option>
                    <option value="me">Mechanical Engineering</option>
                </select>
                <FormFeedback>{errors.schoolOption}</FormFeedback>   
            </FormGroup>
        } else if(this.state.school === "amsom") {
            streamVar = <FormGroup>
                <Label htmlFor="title" className="text-light">Choose stream</Label><br/>
                <select name="stream" style={{width: "100%"}} id= "stream" onChange={this.handleInputChange}>
                    <option value="af">Accounting and Finance</option>
                    <option value="ba">Business Analytics</option>
                    <option value="f">Finance</option>
                    <option value="fe">Finance and Economics</option>
                    <option value="hro">Human Resource and Organisation</option>
                    <option value="m">Marketing</option>
                    <option value="om">Operations Management</option>
                    <option value="ors">Operations Research and Statistics</option>
                    <option value="scm">Supply Chain Management</option>
                </select>
                <FormFeedback>{errors.schoolOption}</FormFeedback>   
            </FormGroup>
        }  else if(this.state.school === "sas") {
            streamVar = <FormGroup>
                <Label htmlFor="title" className="text-light">Choose stream</Label><br/>
                <select name="stream" style={{width: "100%"}} id= "stream" onBlur={this.handleInputChange}>
                    <option value="cs">Computer Science</option> 
                    <option value="economics">Economics</option> 
                    <option value="history">History</option>
                    <option value="ls">Life Sciences</option>
                    <option value="phl">Philosophy, History and Languages</option>
                    <option value="physics">Physics</option>
                    <option value="psychology">Psychology</option>
                    <option value="sps">Social and Political Sciences</option>
                </select>
                <FormFeedback>{errors.schoolOption}</FormFeedback>   
            </FormGroup>
        }
        return (
            <div className="bg_relative">
                <Header />
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
                <div className="d-flex justify-content-center mt-5">
                    <div className="col-lg-4">
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
                                <Label htmlFor="title" className="text-light">Choose school to post in</Label><br/>
                                <select name="school" id= "school" style={{width: '100%'}} onChange={this.handleInputChange}>
                                    <option value="seas">SEAS</option>
                                    <option value="sas">SAS</option>
                                    <option value="amsom">AMSOM</option>
                                </select> 
                            </FormGroup>
                            {streamVar}
                            <FormGroup>
                                <Label htmlFor="title" className="text-light">Title</Label>
                                <Input type="text" id="title" name="title" placeholder="Title"
                                    value={this.state.title} onBlur={this.handleBlur('title')}
                                    valid={errors.title === ''} invalid={errors.title !== ''}
                                    onChange={this.handleInputChange} />
                                <FormFeedback>{errors.title}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="url" className="text-light">URL</Label>
                                <Input type="url" id="url" name="url" placeholder="Place your link here"
                                    value={this.state.url} onBlur={this.handleBlur('url')} onChange={this.handleInputChange} />
                            </FormGroup>
                            {/* <FormGroup> */}
                            <form method="post" action="" enctype='multipart/form-data'>
                                <Label htmlFor="file" className="text-light">Upload a document here</Label>
                                <input type="file" id="file1" name="file1" className="form-control mb-1 bg-light"
                                    onChange={this.handleInputChange} />
                            </form>
                            {/* </FormGroup>     */}
                            <FormGroup>
                                <Label htmlFor="description" className="text-light">Add a Description</Label>
                                <Input type="textarea" rows="3" id="description" name="description"
                                    value={this.state.description} onBlur={this.handleBlur('description')} onChange={this.handleInputChange} />
                            </FormGroup>
                            <p className="d-flex justify-content-center text-danger">{this.state.standardError}</p>
                            <div className="d-flex justify-content-center">
                                <Button type="button" onClick={this.handleSubmit} color="success">Upload and Publish</Button>
                            </div>
                        </CardBody>
                    </Card>
                    </div>
                    
                </div>
            </motion.div>

            </div>
        );
    }
}

export default NewPost;