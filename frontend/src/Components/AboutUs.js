import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class AboutUs extends Component {
    render() {
        return (
            <div className="bg_relative">
                <Header/>
                <div className="rotating-box">
                    <div className="single-rb">
                        <div className="front-side"><img alt="" src="\assets\images\sameep2.jpeg"/></div>
                        <div className="back-side"><img alt="" src="\assets\images\sameep1.jpeg"/></div>
                        <div className="left-side"><img alt="" src="\assets\images\aneri2.jpg"/></div>
                        <div className="right-side"><img alt="" src="\assets\images\aneri1.jpg"/></div>
                    </div>
                </div>
                <div className="fixed-bottom">
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default AboutUs;
