import React, { Component } from 'react';
import Logo from '../UI/Logo/Logo';
import ContactOption from '../UI/ContactOption/ContactOption';
import './_ContactInformation.scss';
import axiosFB from '../../axios/axios';
import Spinner from '../UI/Spinner/Spinner';
import Aux from '../../components/Hoc/Aux/Aux';

class ContactInformation extends Component {
    state = {
        contactData: {}
    }
    getContactInfo = () => {
        axiosFB.get('./res/contact.json')
            .then((contactInfo) => {
                let contactData = {
                    email: contactInfo.data.email,
                    phone: contactInfo.data.phone
                }
                return contactData
            })
            .then((contactData)=>{
            
                this.setState(prevState => ({
                    contactData: { ...contactData }
                }))
            })
    }
    displayContactInfo(){
        return (
            <div className="ContactInformation">
                <Logo />
                <h1>Mark Sweitzer</h1>
                <ContactOption text={this.state.contactData.phone} icon="phone" />
                <ContactOption text={this.state.contactData.email} icon="mail" />
            </div>
        )
    }
    componentDidMount() {
        this.getContactInfo()
 
    }
    render() {
        return (
            <div>
                {this.state.contactData !== null ? this.displayContactInfo() : <Spinner/> } 
            </div>
   
        );
    }
};
export default ContactInformation;