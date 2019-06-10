import React, { Component } from 'react';
import './_Main.scss';
import Intro from '../../components/Intro/Intro';

class Main extends Component {
    render() {
        return (
            <div className="Main">

                <Intro/>
                <span>Coming Soon</span>
            </div>
        );
    }
}

export default Main;