import React, {Component} from 'react';
import ShowBreadcrumb from './ShowBreadcrumb';
import {Card, CardHeader, CardBody} from 'reactstrap';
import axios from 'axios';
import Header from './Header';

class ShowSavedPost extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <ShowBreadcrumb />
                <div className="container">
                    <Card className="col-12 mb-2">
                        <CardHeader className="bg-white"><div className="d-flex justify-content-center"><h3>{this.props.details.title}</h3></div></CardHeader>
                        <CardBody>
                            Description: {this.props.details.description}<br />
                            Want to view the site? <a href={this.props.details.url} >Click Me</a>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

class SavedPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            details_saved: [],
            redirectVar: false,
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/savedPosts')
            .then(response => {
                this.setState({
                    details_saved: response.data.data.results,
                    redirectVar: true,
                });
            })
            .catch(response => {
                alert(response);
            })
    }

    render() {
        let display = this.state.details_saved.map((post) => {
            return(
                <ShowSavedPost details={post} />
            );
        })
        if(this.state.redirectVar) {
            return(
                <div className="bg">
                    <Header />
                    {display}
                </div>
            );
        }
        return(
            <div>
                <Header />
                <ShowBreadcrumb />
            </div>
        );
    }
}

export default SavedPost;