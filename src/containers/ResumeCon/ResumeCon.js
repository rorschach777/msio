import React, { Component } from 'react';
import Resume from '../../components/Resume/Resume';
import './ResumeCon';
import axios from '../../axios/axios';
class ResumeCon extends Component {
    state = {
        resume: {}
    }
    componentDidMount(){
        axios.get('/res.json')
        .then(resume =>{
            this.setState(prevState=>({
                resume: {
                    ...resume.data
                }
            }))
        })
        .then(_=>{
            console.log(this.state);
        })
        console.log(this.state)

    }
    shouldComponentUpdate(nextProps, nextState){
        if (this.state !== nextState || this.props !== nextProps){
            return true
        }
        else {
            return false
        }
    }
    componentWillMount(){
        this.setState(prevState=>({
            resume: {}
        }))
    }
    render() {
        return (
            <div className="ResumeCon">
                <Resume resumeData={this.state.resume}/>
            </div>
        );
    }
}

export default ResumeCon;