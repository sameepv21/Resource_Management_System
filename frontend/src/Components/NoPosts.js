import React, {Component} from 'react';
import { Card, Button, CardBody,CardImg, CardHeader} from 'reactstrap';
import CardFooter from 'reactstrap/lib/CardFooter';
import{Redirect} from 'react-router-dom';

class NoPosts extends Component{
    constructor(props){
        super(props);
        this.state={
            redirectVar: false
        }
    }
    render(){
        if(this.state.redirectVar){
            return(
                <Redirect to="/newPost"/>
            )
        }
        return(
            <div className="container col-md-6">
                <Card className="mb-5 mt-4">
                                <CardHeader  style={{backgroundColor: "black"}}>
                                    <div className="d-flex justify-content-center text-light">
                                        <h2>OOPS!</h2>
                                    </div>
                                    <div className="d-flex justify-content-center text-light">
                                        <p>Nothing here yet</p>
                                    </div>
                                </CardHeader>
                                <CardImg className="mx-auto" src="https://res.cloudinary.com/didf23s1x/image/upload/v1609433586/RMS/NoPost_wllc5n.gif" style={{width:"60%"}}></CardImg>
                                <CardFooter className="d-flex justify-content-center" style={{borderColor:"white", backgroundColor:"white"}}>
                                    <Button className="btn" color="success" onClick={()=> {
                                        this.setState({redirectVar:true})
                                    }}>Start your own post</Button>
                                </CardFooter>
                            </Card>
            </div>
        );
    }
}

export default NoPosts;