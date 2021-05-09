import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse, Nav, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { pageVariants } from '../Shared/PageVariants';


class Header extends Component {
    render() {
        return (
            <div className="color-nav fixed-bottom d-flex justify-content-center" dark>
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
                    <div className="row mb-4">
                        <div className="col text-light">
                            <h5>Sameep Vani</h5>
                            <h6>sameep.v@ahduni.edu.in</h6>
                            <a className='text-light' href="https://www.instagram.com/vanisameep/"><span className="fa fa-instagram fa-lg"></span></a>
                            <a className='text-light' href="https://www.linkedin.com/in/sameep-vani/"><span className="fa fa-linkedin fa-lg  ml-2"></span></a>

                        </div>
                        <div className="col text-light">
                            <h5>Aneri Dalwadi</h5>
                            <h6 >aneri.d@ahduni.edu.in</h6>
                            <a className='text-light' href="https://www.instagram.com/aneriddalwadi/"><span className="fa fa-instagram fa-lg"></span></a>
                            <a className='text-light' href="https://www.linkedin.com/in/aneri-dalwadi/"><span className="fa fa-linkedin fa-lg  ml-2"></span></a>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

}

export default Header;