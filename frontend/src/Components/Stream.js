import React, { Component } from 'react';
import { Card, CardHeader, CardImg, CardFooter, CardImgOverlay, CardBody, Button } from 'reactstrap';
import Header from './Header';
import { Redirect } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants } from '../Shared/PageVariants';

class Stream extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectVar: false,
            id: '',
        }
    }

    render() {
        if (this.state.redirectVar) {
            return (
                <Redirect to={`/feed/${this.state.id}`} />
            );
        }
        let RenderStreams = this.props.school.stream.map((stream) => {
            return (
                // <Card className="mt-3 col-md-4">
                //     <CardHeader className="d-flex justify-content-center" style={{ background: "white" }}>
                //         <h4>{stream.streamName}</h4>
                //     </CardHeader>
                //     <CardImg className="img-fluid" src={stream.streamImage}></CardImg>
                //     <CardFooter style={{ background: "white" }}>
                //         <div className="d-flex justify-content-center">
                //             <Button role="button" onClick={(event) => {
                //                 event.preventDefault();
                //                 this.setState({
                //                     redirectVar: true,
                //                     id: event.target.id,
                //                 });
                //             }} id={stream.streamAbstract} className="stretched-link btn btn-lg text-light" color="primary">Explore</Button>
                //         </div>
                //     </CardFooter>
                // </Card>
                <div className="mt-3 col-md-4" id="container">
                    <Card id="card1">
                        <CardImg id="img1" src={stream.streamImage} alt={stream.streamName} className="img-fluid" />
                        <CardImgOverlay role="button" id={stream.streamAbstract} onClick={(event) => {
                                event.preventDefault();
                                this.setState({
                                    redirectVar: true,
                                    id: event.target.id,
                                });
                            }} className="stretched-link btn btn-lg text-light p-1 rounded">
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
        return (
            <div>
                <Header />
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
                    <div>
                        <Card>
                            <CardImg src="https://res.cloudinary.com/didf23s1x/image/upload/v1609433587/RMS/background_k5hp78.jpg" height="250vh"></CardImg>
                            <CardImgOverlay>
                                <CardBody>
                                    <div className="d-flex justify-content-center">
                                        <div className="mt-2">
                                            <h1 className="text-light background-dark mt-5 mb-3">Explore Your Stream Resources</h1>
                                        </div>
                                    </div>
                                </CardBody>
                            </CardImgOverlay>
                        </Card>
                    </div>
                    <div className="row d-flex justify-content-center">
                        {RenderStreams}
                    </div>
                </motion.div>
            </div>
        );
    }
}

export default Stream;