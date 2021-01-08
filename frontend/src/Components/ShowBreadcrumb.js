import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { motion } from 'framer-motion';
import { pageVariants } from '../Shared/PageVariants';


class ShowBreadcrumb extends Component {
    render() {
        return (
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
                <div className="container d-flex justify-content-center" >
                    <Breadcrumb>
                        <BreadcrumbItem active><Link to="/profile" className="text-decoration-none">Profile</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/security" className="text-decoration-none">Change Password</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/userPosts" className="text-decoration-none">Your Post</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/savedPosts" className="text-decoration-none">Saved Post</Link></BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </motion.div>
        );
    }
}

export default ShowBreadcrumb;