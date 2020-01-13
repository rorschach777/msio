import React from 'react';
import './_Skills.scss';
import Con1080 from '../UI/Con/Con1080/Con1080';
import posed from 'react-pose';
import * as skillsIllustration from '../../assets/images/skills.png';
import jsIcon from '../../assets/images/icons/javascript.jpg';
const SkillsSection= posed.div({
    start:{
        staggerChildren: 150
    },
    finish:{
        staggerChildren: 250
    }
})
const Skill = posed.div({
    start: {
        opacity: 0,
        width: '0%'

    },
    finish:{
        opacity: 1,
        width: ({propVal})=> propVal
    }
})
const Skills = (props) => {
    return (
        <Con1080>
            <div className="Skills">
             <h1>Skills</h1>
             <hr/>
              <div className="Skills__l">
                <div className="Skills__l__top">
                    <div className="Skills__l__top__l">
                    <h3>
                        Languages &amp; Technologies
                    </h3>
                    <ul>
                            <li>HTML5</li>
                            <li>CSS3 | SCSS </li>
                            <li>
                                Javascript
                                <ul>
                                    <li> Vanilla Javascript</li>
                                    <li>ES6</li>
                                    <li> React &amp; Redux </li>
                                </ul>
                            </li>
                            <li> jQuery</li>
                            <li> WordPress - PHP</li>
                            <li> VB.net</li>
                            <li> Github</li>
                        </ul>
                    </div>
                    
                    <div className="Skills__l__r">
                    <h3>
                        Design Software
                    </h3>
                    <ul>
                        <li>Adobe Creative Suite </li>
                        <li>Illustrator</li>
                        <li>Photoshop</li>
                        <li>After Effects</li>
                        <li>InDesign</li>
                        <li>Premier</li>
                        <li>Sketch + InVision</li>
                    </ul>
                    </div>
                </div>
                <img src={skillsIllustration} onClick={props.click}/>
                <div className="Skills__l__bottom">
                    <div className="Skills--row Skills__l__bottom__row">
                        <p>
                        My background originated in graphic design, and has gradually shifted towards
                        front-end development. In recent years I have also gained an appreciation for
                        JavaScript and front-end libraries. 
                        </p>
                    </div>
                    <div>
                    <img className='jsIcon' src={jsIcon}/>
                    <h3>JAVASCRIPT</h3>
                    <p>
                    I was introduced to JavaScript simply by researching relevant
                    industry standards and programming languages.
                    “The appeal of JavaScript is clear – once a developer can
                    code in basic JavaScript, the potential for them to create
                    across a variety of platforms increases substantially.”
                    </p>
                    </div>
             
                </div>  
                </div>
                <SkillsSection pose={!props.loadProgress ? 'start': 'finish'}>
              <div className="Skills__r">
                <div className="row">
                    <h3>Core</h3>
                    <div  className="skill">
                        <span className="skill__label">Adobe Creative Suite</span>
                        <Skill pose={!props.loadProgress ? 'start' : 'finish'} propVal={'92%'} className="skill--99"></Skill>
                        <span className="skill__percentage">99%</span>
                    </div>
                    <div  className="skill">
                        <span className="skill__label">HTML5 | CSS3 | SCSS</span>
                        <Skill pose={!props.loadProgress ? 'start' : 'finish'} propVal={'90%'} className="skill--95"></Skill>
                        <span className="skill__percentage">95%</span>
                    </div>
                    <div  className="skill">
                        <span className="skill__label">Vanilla Javascript</span>
                        <Skill pose={!props.loadProgress ? 'start' : 'finish'} propVal={'85%'} className="skill--92"></Skill>
                        <span className="skill__percentage">92%</span>
                    </div>
                    <div  className="skill">
                        <span className="skill__label">React</span>
                        <Skill pose={!props.loadProgress ? 'start' : 'finish'} propVal={'82%'} className="skill--85"></Skill>
                        <span className="skill__percentage">85%</span>
                    </div>
                </div>

                <div className="row">
                    <h3>Microsoft 70-480</h3>
                    <p>
                    Several of my friends work in the web development field, and have been required to take this exam for compliance purposes. I took this exam more as a way to gauge my own strengths and weaknesses. As expected my strengths reside more in CSS3 and implementing program flow. I look forward to learning more about working with data structures, and data security.
                </p><br/>
          
                    <div  className="skill">
                        <span className="skill__label">Implementing &amp; Manipulating DOM Structures</span>
                        <Skill pose={!props.loadProgress ? 'start' : 'finish'}  propVal={'88%'}className="skill--92"></Skill>
                        <span className="skill__percentage">92%</span>
                    </div>
                    <div  className="skill">
                        <span className="skill__label">Implementing Program Flow</span>
                        <Skill pose={!props.loadProgress ? 'start' : 'finish'}  propVal={'86%'}className="skill--90"></Skill>
                        <span className="skill__percentage">90%</span>
                    </div>
                    <div  className="skill">
                        <span className="skill__label">Accessing and Securing Data</span>
                        <Skill  pose={!props.loadProgress ? 'start' : 'finish'} propVal={'80%'}className="skill--85"></Skill>
                        <span className="skill__percentage">85%</span>
                    </div>
                    <div  className="skill">
                        <span className="skill__label">Using CSS3 in an Application</span>
                        <Skill  pose={!props.loadProgress ? 'start' : 'finish'} propVal={'91%'}className="skill--80"></Skill>
                        <span className="skill__percentage">95%</span>
                    </div>
                </div>
              </div>
              </SkillsSection>
            </div>
    
        </Con1080>
    );
};

export default Skills;