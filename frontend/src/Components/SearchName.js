import React, { Component } from 'react';
import axios from 'axios';

class SearchName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: this.props.search,
            data: [],
        }
    }

    componentDidMount() {
        let data = {
            search: this.state.search
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/search', data)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        data: response.data.data,
                    });
                }
                else {
                    alert(JSON.stringify(response.data.msg));
                }
            })
    }


    render() {
        return (
            <div>
                In name
            </div>
        );
    }
}

export default SearchName;
