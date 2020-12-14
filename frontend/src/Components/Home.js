import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardImgOverlay, CardHeader, CardFooter, Button} from 'reactstrap';
import {Redirect, Link} from 'react-router-dom';
import Header from './Header';
import SchoolDetails from '../Shared/SchoolDetails';

class RenderSchools extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            redirectVar: false,
            id: 0,
        }

        this.exploreSchool = this.exploreSchool.bind(this);
    }

    exploreSchool(event) {
        this.setState({
            redirectVar: true,
            id: event.target.id,
        });
    }

    render() {
        if(this.state.redirectVar) {
            return(
                <Redirect to={`/home/${this.state.id}`} />
            );
        }
        var renderSchool = SchoolDetails.map((school)=>{
            return(
                    <Card className="mt-3 col-md-3">
                        <CardHeader className="d-flex justify-content-center" style = {{background: "white"}}>
                             <h3><strong>{school.schoolName}</strong></h3>
                        </CardHeader>
                        <CardImg className="img-fluid" src={school.image}></CardImg>
                        <CardFooter style = {{background: "white"}}>
                            <div className="d-flex justify-content-center">
                                <Button role="button" id={school.schoolName} onClick={this.exploreSchool} className="stretched-link btn btn-lg text-light" color="primary">Explore</Button>
                            </div>
                        </CardFooter>
                    </Card>
            );
        });

        return (renderSchool);
    }
}

class Home extends Component{
    render(){
        return(
            <div>
                <Header />
                <div >
                    <Card>
                        <CardImg src ="assets/images/background.jpg" height="250vh"></CardImg>
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
            </div>
            
        );
    }
}

export default Home;