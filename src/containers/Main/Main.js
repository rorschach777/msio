import React, { Component } from 'react';
import './_Main.scss';
import Intro from '../../components/Intro/Intro';

class Main extends Component {
    render() {
        return (
            <div className="Main">

                <Intro/>
            </div>
        );
    }
}

export default Main;