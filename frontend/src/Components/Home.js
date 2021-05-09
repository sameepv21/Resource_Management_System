import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardImgOverlay, CardHeader, CardFooter, Button } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import Header from './Header';
import SchoolDetails from '../Shared/SchoolDetails';
import { motion } from 'framer-motion';
import cookie from 'react-cookies';
import { pageVariants } from '../Shared/PageVariants';

class RenderSchools extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectVar: false,
            id: 0,
            redirectLogin: false,
        }

        this.exploreSchool = this.exploreSchool.bind(this);
    }

    exploreSchool(event) {
        this.setState({
            redirectVar: true,
            id: event.target.id,
        });
    }

    componentDidMount() {
        if (!cookie.load("cookie")) {
            this.setState({ redirectLogin: true });
        }
    }

    render() {
        if (this.state.redirectVar) {
            return (
                <Redirect to={`/home/${this.state.id}`} />
            );
        }
        if (this.state.redirectLogin) {
            return (
                <Redirect to='/login' />
            );
        }
        var renderSchool = SchoolDetails.map((school) => {
            return (
                // <div className="mt-3 col-md-4">
                //     <Card>
                //         <CardHeader className="d-flex justify-content-center" style={{ background: "white" }}>
                //             <h3>{school.schoolName}</h3>
                //         </CardHeader>
                //         <CardImg className="img-fluid" src={school.image}></CardImg>
                //         <CardFooter style={{ background: "white" }}>
                //             <div className="d-flex justify-content-center">
                //                 <Button role="button" id={school.schoolName} onClick={this.exploreSchool} className="stretched-link btn btn-lg text-light p-1 rounded" color="primary">Explore</Button>
                //             </div>
                //         </CardFooter>
                //     </Card>
                // </div>
                <div className="mt-3 col-lg-4" id="container">
                    <Card id="card1">
                        <CardImg id="img1" src={school.image} alt={school.name} className="img-fluid" />
                        <CardImgOverlay role="button" id={school.schoolName} onClick={this.exploreSchool} className="stretched-link btn btn-lg text-light p-1 rounded">
                            <CardBody className="row h-100 d-flex justify-content-center">
                                <div id="cardText" className="my-auto">
                                    <p style={{color: 'black'}}>Click to Hop in</p>
                                </div>
                            </CardBody>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (renderSchool);
    }
}

class Home extends Component {
    render() {
        return (
            <div style={{ overflowX: 'hidden' }}>
                <Header />
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
                    <div >
                        <Card>
                            <CardImg src="https://res.cloudinary.com/didf23s1x/image/upload/v1609433587/RMS/background_k5hp78.jpg" height="250vh"></CardImg>
                            <CardImgOverlay>
                                <CardBody>
                                    <div className="d-flex justify-content-center">
                                        <div className="mt-2">
                                            <h1 className="text-light background-dark mt-5 mb-3">Explore Your School Resources</h1>
                                        </div>
                                    </div>
                                </CardBody>
                            </CardImgOverlay>
                        </Card>
                        <div className="row d-flex justify-content-center">
                            <RenderSchools />
                        </div>
                    </div>
                </motion.div>
            </div>

        );
    }
}

export default Home;