import React from 'react';
import './_Resume.scss';
import Con1080 from '../UI/Con/Con1080/Con1080';
import axios from '../../axios/axios';
import Spinner from '../UI/Spinner/Spinner';
import Aux from '../Hoc/Aux/Aux';
const Resume = (props) => {
    let resume = () => {
        if(Object.keys(props.resumeData).length === 0 ){
        return <Spinner/>
        }
        else {
            let languagesTop = [props.resumeData.languages[0], props.resumeData.languages[1]]
            let languagesMid = [...props.resumeData.javascript]
            let languagesBot = [props.resumeData.languages[2], props.resumeData.languages[3], props.resumeData.languages[4], props.resumeData.languages[5] ]
            let langLength = props.resumeData.languages.length
    

            return (
                <Aux>
                <h1 className="section-title">Resume</h1>
                <div className="Resume">
          
                    <hr />
                    <div className="Resume__left">
                        <section>
                        <h3>
                            Education
                        </h3>
                            <h4>{props.resumeData.education.college.name}</h4>
                            <p>{props.resumeData.education.college.date}</p>
                            <h4>{props.resumeData.education.studyAbroad.name}</h4>
                            <p>{props.resumeData.education.studyAbroad.date}</p>
                        </section>
                        <section>
                            <h3>
                                PROFILE
                            </h3>
                            <p>
                                {props.resumeData.profile}
                            </p>
                        </section>
                        <section>
                            <h3>
                                Languages &amp; Technologies:
                            </h3>
                            <ul>
                                {languagesTop.map((cur, idx)=>{
                                    return <li>{cur}</li>
                                })}
                                <li>
                                    Javascript
                                    <ul>
                                    {languagesMid.map((cur, idx)=>{
                                    return <li>{cur}</li>
                                })}
                                    </ul>
                                </li>
                                {languagesBot.map((cur, idx)=>{
                                    return <li>{cur}</li>
                                })}
                            </ul>
                        </section>
                        <section>
                            <h3>Design Software</h3>
                            <ul>
                                {props.resumeData.designSoftware[0].AdobeCreativeSuite.map((cur, idx)=>{
                                    return <li key={`designSoftware1-${cur}`}>{cur}</li>
                                })}
                                {props.resumeData.designSoftware[1].Other.map((cur, idx)=>{
                                    return <li key={`designSoftware2-${cur}`}>{cur}</li>
                                })}
                            </ul>
                        </section>
                        <section>
                            <h3>Professional Certifications</h3>
                            <p>{props.resumeData.professionalCertfications[0]}</p>
                        </section>
                    </div>
                    <div className="Resume__right">
                        {
                            props.resumeData.professionalExperience.map((cur, idx)=>{
                                return (
                                    <section>
                                     
                                        <h4>{cur.name}</h4>
                                        <h5>{cur.title}</h5>
                                        <h6>{cur.date}</h6>
                                        <ul>
                                            {cur.duties.map((cur, idx)=>{
                                                return <li>{cur}</li>
                                            })}
                                        </ul>
                                    </section>
                                )
                            })
                        }
                    </div>
                </div> 
                </Aux>
           
            )
        }
    }

    return (
            <Con1080 >
                {resume()}
             
               
            </Con1080>


    );
};

export default Resume;
