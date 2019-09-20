import React from 'react';
import ContactInformation from '../ContactInformation/ContactInformation';
import Con1080 from '../UI/Con/Con1080/Con1080';
import Aux from '../Hoc/Aux/Aux';
import './_Contact.scss';
import ButtonLg from '../../components/UI/Buttons/ButtonLg/ButtonLg';
import Input from '../UI/Input/Input';
import TextArea from '../UI/TextArea/TextArea';
import LoginPanel from '../Login/LoginPanel/LoginPanel';
import Spinner from '../UI/Spinner/Spinner';

const Contact = (props) => {
 
    const contactForm = {
        ...props.data.form
    }

    let contactFormArr = []
    for (let key in contactForm){
        contactFormArr.push(
            {
                id:`${key}`,
                config: {...contactForm[key]}
            }
        )
    }
    const contactBody = () => {
        if (props.formSubmitted) {
            contactDialog()
        }
        else {
            return (
                <Aux>
                <ContactInformation/>
                <div className="Contact__form">
                    <div className="Contact__form__left">
                        <div className="Contact__form__left__info">
                            {contactFormArr.map((cur, idx)=>{
                           
                                if (cur.config.inputConfig.type === 'input'){
                                    return (
                                    <Input
                                    id={cur.id}
                                    key={cur.id}
                                    data={props.data}
                                    label={cur.config.inputConfig.label}
                                    layout={cur.config.inputConfig.fieldLayoutClass}
                                    errorMessage={cur.config.inputConfig.errorMessage}
                                    errorVisible={cur.config.inputConfig.errorVisible}
                                    isvalid={cur.config.isValid}
                                    placeholder={cur.config.placeholder}
                                    onChange={(e)=>props.onChange(e, props.data)}
                                    />
                                    )
                                }
                                else if (cur.config.inputConfig.type === 'text-area'){
                                    return (
                                    <TextArea
                                    id={cur.id}
                                    key={cur.id}
                                    data={props.data}
                                    label={cur.config.inputConfig.label}
                                    errorMessage={cur.config.inputConfig.errorMessage}
                                    errorVisible={cur.config.inputConfig.errorVisible}
                                    isvalid={cur.config.isValid}
                                    placeholder={'Type your message here'}
                                    onChange={(e)=>props.onChange(e, props.data)}
                                    type="text"/>
                                    ) 
                                }
                            })}
                        </div>
                        {props.formValid ? <ButtonLg click={(e)=>props.contactSubmit(e, props.mainState, props.data)} text="Submit"/> : null}
                    </div>
                    <div className="Contact__form__right">
                        <h3>Send Me A Message </h3>
                        <p>
                            Thank you for your time and attention to my resume and porfolio samples. 
                        </p>
                        <br/>
                        <p>
                            I’m excited about the recent opening within {props.mainState.userInfo.company} for the {props.coverLetter.jobs.jobTitle} position, and would appreciate the opportunity to speak with you further in person regarding my experience, skills, accomplishments, and the specific value I can add to your team. 
                        </p>
                        <br/>
                        <p>
                            {props.coverLetter.jobs.coverLetter.statement1}&nbsp;{props.coverLetter.jobs.coverLetter.statement2}&nbsp;{props.coverLetter.jobs.coverLetter.statement3}&nbsp;
                        </p>
                        <br/>
                        <p>
                            Please call me at 610.731.9066 to schedule a personal interview at your convenience.
                        </p>
                        <br/>
                        <p>
                            {props.coverLetter.coverLetter.statement6}<br/>
                            {props.coverLetter.coverLetter.statement7}
                        </p>
                    </div>
            
                </div>
            </Aux>
            )
        }
        
    }
              
      
    const contactDialog = () => {
        return(
            <LoginPanel>
                <h1>Success!</h1>
                <p>Your contact submission was successfully submitted</p>
                <ButtonLg click={props.contactReset} text="Continue"/>
            </LoginPanel>
        )
    }                   
  
     
      
      
    

    return (
        <Con1080>
            <div className="Contact">
                {props.coverLetter.loaded ? contactBody() : <Spinner/>}
               {/* {props.formSubmitted ? contactDialog() : contactBody() } */}
            </div>
     
        </Con1080>
    );
};
export default Contact;