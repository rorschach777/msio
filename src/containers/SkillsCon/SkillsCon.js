import React, { Component } from 'react';
import './_SkillsCon.scss';
import Skills from '../../components/Skills/Skills';
import {connect} from 'react-redux'
import * as reduxActions from '../../store/actions/index'
class SkillsCon extends Component {
    componentDidMount(){
        this.props.toggleLoadProgress()
    }
    shouldComponentUpdate(nextProps, nextState){
    
        if (this.props.loadProgress) {
            return false
        }
        else if (!this.props.loadProgress) {
            return true
        }
    }
    render() {
        return (
            <div className="SkillsCon">
                <Skills loadProgress={this.props.loadProgress}/>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loadProgress: state.skills.loadProgress
    }
}
const mapDispatchToProps = dispatch => {
    return {
        toggleLoadProgress: ()=>dispatch(reduxActions.loadProgress())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SkillsCon);