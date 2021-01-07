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
                        <div className="front-side"><img alt="Sameep Vani" src="https://res.cloudinary.com/didf23s1x/image/upload/v1609433587/RMS/sameep2_isbelf.jpg"/></div>
                        <div className="back-side"><img alt="Sameep Vani" src="https://res.cloudinary.com/didf23s1x/image/upload/v1609433586/RMS/sameep1_virpu7.jpg"/></div>
                        <div className="left-side"><img alt="Aneri Dalwadi" src="https://res.cloudinary.com/didf23s1x/image/upload/v1609433587/RMS/aneri2_ny3pp9.jpg"/></div>
                        <div className="right-side"><img alt="Aneri Dalwadi" src="https://res.cloudinary.com/didf23s1x/image/upload/v1609433587/RMS/aneri1_lzwrni.jpg"/></div>
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
