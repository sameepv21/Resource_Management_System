import React,{Component} from 'react';
import Header from './Header';
import {Button, Card, CardImg, CardBody, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import ShowBreadcrumb from './ShowBreadcrumb';
import EditProfile from './EditProfile';
import axios from 'axios';
import CardHeader from 'reactstrap/lib/CardHeader';

class ShowProfile extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            redirectVar: false,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    
    handleClick() {
        this.setState({
            redirectVar: true,
        });
    }

    render() {
        if(this.state.redirectVar) {
            return(
                <EditProfile data={this.props.data} />
            );
        }
        else {
            return(
                <div className="mt-2 container d-flex justify-content-center ">
                   <Card style={{width: "70%"}}>
                       <CardHeader style={{backgroundColor: "white", borderColor: "white"}}>
                       <div className="d-flex justify-content-center">
                            <img src="\assets\images\Profile.gif" style={{width:"50%"}}></img>
                       </div>
                       </CardHeader>
                       <CardBody>
                        <div className="d-flex justify-content-center row ">
                            <div className="mx-auto d-flex justify-content-end">
                                <img className="rounded-circle d-flex justify-content-end" src={this.props.data.imageUrl}/>
                            </div>
                            <div  className="mx-auto">
                                <h6>Name: {this.props.data.firstName} {this.props.data.lastName}</h6>
                                <h6>Email: {this.props.data.email}</h6>
                                <h6>Enrollment Number: AU{this.props.data.roll}</h6>
                            </div>
                        </div>
                        </CardBody>
                        <div className="d-flex justify-content-center">
                            <Button onClick={this.handleClick} type="button" color="success" className="mb-2">
                                <span className="mr-2 fa fa-pencil"></span>
                                Edit Profile
                            </Button>
                        </div>
                    </Card> 
                </div>
            );
        }
    }
}

class Profile extends Component{

    constructor(props){
        super(props);
        
        this.state={
            data: {}
        }
    
        this.getProfile = this.getProfile.bind(this);
    }

    componentDidMount() {
        this.getProfile();
    }

    async getProfile(){
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/profile')
            .then(response => {
                this.setState({
                    data: JSON.parse(response.data.data),
                })
            })
            .catch(response => {
                alert(response);
            })
    }

    render(){
        return(
            <div className="bg_fixed">
                <Header />
                <ShowBreadcrumb />
                <ShowProfile data={this.state.data}/>
            </div>
            
        );
    }
}

export default Profile;