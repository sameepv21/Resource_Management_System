import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

class ShowBreadcrumb extends Component {
    render() {
        return(
            <div className="container d-flex justify-content-center" >
                <Breadcrumb>
                    <BreadcrumbItem active><Link to="/profile">Profile</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/security">Change Password</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/userPosts">Your Post</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/savedPosts">Saved Post</Link></BreadcrumbItem>
                </Breadcrumb>
            </div>
        );
    }
}

export default ShowBreadcrumb;