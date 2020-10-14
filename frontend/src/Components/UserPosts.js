import React, {Component} from 'react';
import axios from 'axios';
import Header from "./Header";
import { Card, CardHeader, CardBody, CardImg, CardFooter, Button } from 'reactstrap';

function ShowPost({particularPostDetail}) {
    //alert(JSON.stringify(particularPostDetail));
    let filePath = '../../backend/uploads/AU1940049' + '/' + particularPostDetail.file_name;
    return(
        <div className="container">
            <Card className="col-10 m-2">
                <CardHeader className="bg-white"><div className="d-flex justify-content-center"><h3>{particularPostDetail.title}</h3></div></CardHeader>
                <CardBody>
                    Description: {particularPostDetail.description}<br />
                    Want to view the site? <a href={particularPostDetail.url} >Click Me</a>
                </CardBody>
                <div className="d-flex justify-content-center">
                    <CardFooter className="bg-white">
                        <Button className="btn m-1" color="warning">Edit<span className="ml-2 fa fa-pencil"></span></Button>
                        <Button className="btn m-1" color="success" href="./Header.js" download>Download<span className="ml-2 fa fa-download"></span> </Button>
                        <Button className="btn m-1" color="danger">Delete this Post<span className="ml-2 fa fa-trash-o"></span></Button>
                        <Button className="btn m-1" color="primary">Add to saved posts<span className="ml-2 fa fa-bookmark"></span></Button>
                    </CardFooter>
                </div>
            </Card>
        </div>
    );
}

class UserPosts extends Component{
    constructor(props) {
        super(props);

        this.state = {
            postDetails: [],
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/userPost')
            .then(response => {
                //alert(JSON.stringify(response.data.data.results[0].email) + "             " + typeof response.data.data.results);
                this.setState({
                    postDetails: response.data.data.results,
                    redirectVar: true,
                })
            })
            .catch(response => {
                alert(response);
            });
    }

    render(){
        let display = this.state.postDetails.map((post) => {
            return(
                <ShowPost particularPostDetail={post} />
            );
        });
        if(this.state.redirectVar) {
            return(
                <div className="bg">
                    <Header />
                    {display}
                    <br /><br /><br /><br /><br /><br /><br />
                </div>
            );
        } else {
            return(
                <div className="bg">
                    <Header />
                </div>
            )
        }
    }
}
export default UserPosts;
