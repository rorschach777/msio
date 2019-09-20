import React, { Component } from 'react';
import Contact from '../../components/Contact/Contact';
import {connect} from 'react-redux';
import * as rdxActions from '../../store/actions/index';
class ContactCon extends Component {
    componentDidMount(){
        this.props.coverLetterLoad(this.props.mainState.userInfo.accessKey)
    }
    shouldComponentUpdate(nextProps, nextState){
        if (this.props !== nextProps){
            return true
        }
        else {
            return false
        }
    }
    render() {
        return (
            <div className="ContactCon">
                <Contact 
                data={this.props.contactState}
                coverLetter={this.props.coverLetter}
                contactSubmit={this.props.contactSubmit}
                contactReset={this.props.contactReset}
                mainState={this.props.mainState}
                onChange={this.props.contact}
                formValid={this.props.formValid}
                formSubmitted={this.props.formSubmitted}
              
                />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        contactState: state.contact,
        mainState: state.main,
        formValid: state.contact.formValid,
        formSubmitted: state.contact.formSubmitted,
        contactForm: state.contact.form,
        coverLetter: state.coverLetter
    }
}
const mapDispatchToProps = dispatch => {
    return {
        coverLetterLoad: (accessKey)=>dispatch(rdxActions.coverLetterLoad(accessKey)),
        contact: (e, contactForm)=>dispatch(rdxActions.contactFormInit(e, contactForm)),
        contactSubmit: (e, mainState, contactState)=>dispatch(rdxActions.contactFormSubmit(e, mainState, contactState)), 
        contactReset: (e)=>dispatch(rdxActions.contactReset(e))
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactCon);