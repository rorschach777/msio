import React from 'react';
import './_CoverLetter.scss';
import Con1080 from '../UI/Con/Con';
import Logo from '../UI/Logo/Logo';
import contentBucket from '../../assets/links/contentBucket';
import ContactInformation from '../ContactInformation/ContactInformation';
import Aux from '../../components/Hoc/Aux/Aux';
import Spinner from '../UI/Spinner/Spinner';
const CoverLetter = (props) => {
    // let job = props.jobsData[1]
    const baseImgDir = `${contentBucket}/company`;
    const key = props.userInfo.accessKey.split('_')
    const imgName = `${key[key.length - 1]}.png`.toLowerCase();
    const additionalContent = () => {
        if (props.data.coverLetter.statement1.charAt(0) !== ''){
            return (
                <Aux>
                    {props.data.jobs.coverLetter.statement1}&nbsp;
                    {props.data.jobs.coverLetter.statement2}&nbsp;
                    {props.data.jobs.coverLetter.statement3}&nbsp;
                </Aux>
            )
        }
        else {
            return
        }
    }
    const coverLetterContent = () => {
        if ( Object.keys(props.data.coverLetter).length === 0){
            return (
                <Spinner/>
                )
        }
        else {
            return (
            <p>
                {props.data.jobs.appliedDate},<br /><br />
                Dear&nbsp; {props.userInfo.firstName}&nbsp;{props.userInfo.lastName},
                <br/><br/>
                {props.data.coverLetter.statement1}&nbsp;  
                {props.data.jobs.jobTitle} within {props.data.jobs.company},&nbsp;
                {props.data.coverLetter.statement2}  

                <br/><br/>
                {props.data.coverLetter.statement3}
                {props.data.coverLetter.statement4}  
                <br/><br/>
                {additionalContent()}
          
                <br/><br/>
                {props.data.coverLetter.statement5}   
                <br/><br/>
                {props.data.coverLetter.statement6}
                <br/><br/>
                {props.data.coverLetter.statement7}      
            </p>
            )
        }
    }
    return (
        <Con1080>
            <div className='Cover-Letter'>
                {/* TODO: THIS LOOKS A BIT LOWER THAN ALL THE OTHER CONTAINER */}
                <div className='Cover-Letter__left'>
                    <ContactInformation/>
                </div>
                <div className='Cover-Letter__right'>
                    {/* TODO: IMAGES ARENT RENDERING */}
                    <img src={`${baseImgDir}/${imgName}`} />
                    {coverLetterContent()}
                </div>
            </div>
        </Con1080>

    );
};

export default CoverLetter;