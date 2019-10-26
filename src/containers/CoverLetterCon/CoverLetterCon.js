import React, { Component } from 'react';
import CoverLetter from '../../components/CoverLetter/CoverLetter'
import Aux from '../../components/Hoc/Aux/Aux';
import {connect} from 'react-redux';
import * as reduxActions from '../../store/actions/index';
import mainReducer from '../../store/reducers/mainReducer';
class CoverLetterCon extends Component {   
    componentDidMount(){
        this.props.coverLetterLoad(this.props.userInfo.accessKey);
    }
    shouldComponentUpdate(nextProps, nextState){
       if(this.props !== nextProps ){
           return true
       }
       else {
            return false
        }
    }
    render() {
        return (
            <Aux className="CoverLetterContainer">
                <CoverLetter 
                userInfo={this.props.global}
                data={this.props.local} 
             
                />
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        global: state.main.userInfo,
        local: state.coverLetter
    }
}
const mapDispatchToProps = dispatch => {
    return {
        coverLetterLoad: (accessKey)=>dispatch(reduxActions.coverLetterLoad(accessKey))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoverLetterCon);