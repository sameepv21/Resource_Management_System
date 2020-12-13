import React, { Component } from 'react';
import { Form, FormGroup, Input, Card, Button, CardBody, Label, DropdownToggle, CardHeader, FormFeedback } from 'reactstrap';
import Header from './Header';
import axios from 'axios';

class NewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            url: '',
            file: '',
            school: '',
            description: '',
            redirectVar: false,
            touched: {
                title: false,
            },
        }

        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectStream = this.selectStream.bind(this);
    }

    selectStream(){
        if(this.state.school === "seas"){
        } else if(this.state.school === "sas"){
        } else if(this.state.school === "amsom"){
        } else{
            
        }
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    async handleSubmit(event) {
        
        event.preventDefault();
        let formData = new FormData();
        formData.append('school', this.state.school);
        formData.append('title', this.state.title);
        formData.append('url', this.state.url);
        formData.append('description', this.state.description);
        formData.append('file', this.state.file);

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/uploadPost', formData);
    }

    handleInputChange = (event) => {
        let target = event.target;
        console.log('The target is: ' + target.value);
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
            console.log('name is: ' + name);
            this.setState({
                [name]: value,
            });
            console.log("school=" + this.state.school);
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
        let errors = this.validate(this.state.title, this.state.school);
        return (
            <div className="bg">
                <Header />
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
                                <Label htmlFor="title" className="text-light">Choose school to post in</Label><br/>
                                <select name="school" valid={errors.schoolOption === ''} invalid={errors.schoolOption !== ''} style={{width: "100%"}} id= "school" onBlur={this.handleInputChange}>
                                    <option value="chooseSchool">Choose here</option>
                                    <option value="seas">SEAS</option>
                                    <option value="sas">SAS</option>
                                    <option value="amsom">AMSOM</option>
                                </select> 
                                <FormFeedback>{errors.schoolOption}</FormFeedback>   
                            </FormGroup>
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
                                    accept="image/*" onChange={this.handleInputChange} />
                            </form>
                            {/* </FormGroup>     */}
                            <FormGroup>
                                <Label htmlFor="description" className="text-light">Add a Description</Label>
                                <Input type="textarea" rows="3" id="description" name="description"
                                    value={this.state.description} onBlur={this.handleBlur('description')} onChange={this.handleInputChange} />
                            </FormGroup>
                            <div className="d-flex justify-content-center">
                                <Button type="button" onClick={this.handleSubmit} color="success">Upload and Publish</Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

export default NewPost;