import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

class ShowBreadcrumb extends Component {
    render() {
        return(
            <div className="container d-flex justify-content-center" >
                <Breadcrumb>
                    <BreadcrumbItem active><Link to="/profile" className="text-decoration-none">Profile</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/security" className="text-decoration-none">Change Password</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/userPosts" className="text-decoration-none">Your Post</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/savedPosts" className="text-decoration-none">Saved Post</Link></BreadcrumbItem>
                </Breadcrumb>
            </div>
        );
    }
}

export default ShowBreadcrumb;