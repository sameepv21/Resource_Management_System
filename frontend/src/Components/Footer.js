import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse, Nav, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class Header extends Component {
 render() {
        return(
            <div className="color-nav sticky-bottom d-flex justify-content-center" dark>
                <div className="row">
                    <div className="col text-light">
                        <h5>Sameep Vani</h5>
                        <h6>sameep.v@ahduni.edu.in</h6>
                        <span className="fa fa-instagram fa-lg"></span>
                        <span className="fa fa-linkedin fa-lg ml-2"></span>
                    </div>
                    <div className="col text-light">
                        <h5>Aneri Dalwadi</h5>
                        <h6 >aneri.d@ahduni.edu.in</h6>
                        <span className="fa fa-instagram fa-lg"></span>
                        <span className="fa fa-linkedin fa-lg  ml-2"></span>
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;