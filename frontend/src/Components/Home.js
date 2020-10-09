import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardImgOverlay, CardHeader, CardFooter} from 'reactstrap';
import Header from './Header';

function RenderSchools(){
    return(
        <div className="row mt-2">
            <Card className="border-dark col-12 col-md m-1">
                <CardHeader className="d-flex justify-content-center">
                     <h2>AMSOM</h2>
                </CardHeader>
                <CardImg className="img-fluid" src='assests/images/amsom.jpg'></CardImg>
                <CardFooter>
                    <div className="d-flex justify-content-center">
                        <a role="button" href="" class="stretched-link btn btn-primary btn-lg text-light">Explore</a>
                    </div>
                </CardFooter>
            </Card>

            <Card className="border-dark col-12 col-md m-1">
                <div className="card-header d-flex justify-content-center">
                     <h2>SEAS</h2>
                </div>
                <CardImg src='assests/images/seas.png'></CardImg>
                <CardFooter>
                    <div className="d-flex justify-content-center">
                        <a role="button" href="/" class="stretched-link btn btn-primary btn-lg text-light">Explore</a>
                    </div>
                </CardFooter>
            </Card>

            <Card className="border-dark col-12 col-md m-1">
                <div className="card-header d-flex justify-content-center">
                     <h2>SAS</h2>
                </div>
                <CardImg src='assests/images/sas.jpg'></CardImg>
                <CardFooter>
                    <div className="d-flex justify-content-center">
                        <a role="button" href="" class="stretched-link btn btn-primary btn-lg text-light">Explore</a>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

class Home extends Component{
    render(){
        return(
            <div>
                <Header />
                <div >
                    <Card>
                        <CardImg src ="assests/images/background.jpg" height="250vh"></CardImg>
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
                    <RenderSchools/>
                </div>
            </div>
            
        );
    }
}

export default Home;