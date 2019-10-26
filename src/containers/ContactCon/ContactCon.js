import React, { Component } from 'react';
import Contact from '../../components/Contact/Contact';
import {connect} from 'react-redux';
import * as rdxActions from '../../store/actions/index';
import './_ContactCon.scss';
class ContactCon extends Component {
    componentDidMount(){
        this.props.coverLetterLoad(this.props.mainState.userInfo.accessKey)
    }

    sendContactInfo=(e)=>{
        e.preventDefault()
        const email = {
            recipient: 'mark.sweitzer@marksweitzer.io',
            sender: `${this.props.contactState.form.emailAddress.value}`,
            firstName: `${this.props.contactState.form.firstName.value}`,
            lastName: `${this.props.contactState.form.lastName.value}`,
            phone: `${this.props.contactState.form.phoneNumber.value}`, 
            subjectLine: `${this.props.contactState.form.subjectLine.value}`, 
            message: `${this.props.contactState.form.message.value}`, 
 
        }
        fetch(`https://sendgrid-webserver.herokuapp.com/contact?recipient=${email.recipient}&sender=${email.sender}&firstName=${email.firstName}&lastName=${email.lastName}&phone=${email.phone}&subjectLine=${email.subjectLine}&message=${email.message}&key=${this.props.rdxAuthState.sgKey}`)
        .catch(err => console.error(err))

     
    }
 
    render() {
        return (
            <div className="ContactCon">
                <Contact 
                data={this.props.contactState}
                coverLetter={this.props.coverLetter}
                contactSubmit={this.sendContactInfo}
                contactSubmissionSuccess={this.props.contactSubmissionSuccess}
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
        coverLetter: state.coverLetter, 
        rdxAuthState: state.authentication,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        coverLetterLoad: (accessKey)=>dispatch(rdxActions.coverLetterLoad(accessKey)),
        contact: (e, contactForm)=>dispatch(rdxActions.contactFormInit(e, contactForm)),
        contactSubmissionSuccess: ()=>dispatch(rdxActions.contactFormSubmitSuccess()),
        // contactSubmit: (e, mainState, contactState)=>dispatch(rdxActions.contactFormSubmit(e, mainState, contactState)), 
        contactReset: (e)=>dispatch(rdxActions.contactReset(e))
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactCon);