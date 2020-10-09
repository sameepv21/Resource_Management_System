import React,{Component} from 'react';
import Header from './Header';
import {Button, Card, CardImg, CardBody, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';

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
                <div className="mt-5 container d-flex justify-content-center">
                   <Card className="col-12">
                        <div className="d-flex mt-3 justify-content-center">
                            <CardImg className="col-md-3 col-sm-10 rounded-circle" src="assests/images/sameep.jpg"/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <CardBody>
                                <h5>Name: {this.props.data.firstName} {this.props.data.lastName}</h5>
                                <h5>Email: {this.props.data.email}</h5>
                                <h5>Enrollment Number: AU{this.props.data.roll}</h5>
                                <div className="d-flex justify-content-center">
                                    
                                    <Button onClick={this.handleClick} type="button" color="success">
                                        <span className="mr-2 fa fa-pencil"></span>
                                        Edit Profile
                                    </Button>
                                </div>
                            </CardBody>
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
        var options = {
            method: 'GET',
            header:{
                'Content-Type': 'application/json' 
            } 
        }
        
        var response = await fetch('/profile', options);
        var res = await response.json();
        var dataResponse = JSON.parse(res.data);
        this.setState({
            data: dataResponse,
        });
    }

    render(){
        return(
            <div>
                <Header />
                <div className="container">
                    <Breadcrumb>
                        <BreadcrumbItem active><Link to="/profile">Profile</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/security">Change Password</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/userPosts">Your Post</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/savedPost">Saved Post</Link></BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <ShowProfile data={this.state.data}/>
            </div>
            
        );
    }
}

export default Profile;