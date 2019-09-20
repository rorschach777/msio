

import React, { Component } from 'react';
import logoImg from '../../../assets/images/logo-light.svg';
import {NavLink} from 'react-router-dom';
import './_Header.scss';
import posed from 'react-pose';
import Avatar from '../Avatar/Avatar';
const FadeHeader = posed.div({
    show: {
        applyAtStart: { display: 'block' },
        opacity: 1
    },
    hide: {
        applyAtEnd: { display: 'none' },
        opacity: 0
    }
})
const RotatingIcon = posed.span({
    open: {
        applyAtStart: { display: 'block' },
        rotate: 180,

    },
    close: {
        applyAtStart: { display: 'none' },
        rotate: 0
    }
})
const MobileMenu = posed.div({
    show: {
        applyAtStart: { display: 'block' },
        y: '0%',
    },
    close: {
        applyAtEnd: { display: 'none' },
        y: '-120%',
    }
})
class Header extends Component {
    state = {
        showStickyMenu: true,
        mobileMenuOpen: true,
    }
    resetHeader = () => {
        this.setState(prevState=> ({
            // restore the original state. 
            showStickyMenu: true, 
            mobileMenuOpen: true, 
    
        }))
    }
    toggleMenu = (e, setValue = false) => {
        e.preventDefault();
        let bodyList = Array.from(document.getElementById('root-body').classList)
        console.log(bodyList.length)
        // Panel is shown
        if ((!bodyList.length && this.state.count === 1) || (bodyList.length === 2)) {
            // ui kit upon loading the first time treats the class list differently, 
            // every time after that the class list is = 2 when open
            this.setState(prevState => ({
                showStickyMenu: false,
   
            }))
        }
        // Panel not shown
        else if( bodyList.length === 1 ) {
            this.setState(prevState => ({
                showStickyMenu: true,
            }))
        }
    }
    toggleMobileMenu = (e)=> {
        e.preventDefault();
        this.setState(prevState=>({
            mobileMenuOpen: !prevState.mobileMenuOpen
        }))
    }
    componentDidUpdate=()=>{
        if (this.state.count > 1){
            window.addEventListener('click', (e) => {
                this.toggleMenu(e)
            })
        }
     
    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.state !== nextState){
            return true
        }
        else {
            return false
        }
    }
    render() {
        let menuIcon = <RotatingIcon pose={this.state.mobileMenuOpen ? 'close' : 'open'}><span className="burger-menu" uk-icon="icon: menu; ratio: 1" onClick={this.toggleMobileMenu}></span></RotatingIcon>
        let closeIcon = <RotatingIcon pose={this.state.mobileMenuOpen ? 'open' : 'close'}><span className="burger-menu" uk-icon="icon: close; ratio: 1" onClick={this.toggleMobileMenu}></span></RotatingIcon>

        return (
            <header>
                <div className="header header__desktop">
                    <FadeHeader className="header__oncanvas" pose={this.state.showStickyMenu ? 'show' : 'hide'}>
                        <img src={logoImg} type="button" type="button" uk-toggle="target: #offcanvas-push" alt="logo" />
                        <span>MARKSWEITZER</span>
                    </FadeHeader>
                    <div id="offcanvas-push" uk-offcanvas="mode: push;" >
                        <div className="header__offcanvas uk-offcanvas-bar">
                            <div className="header__offcanvas__close-nav">
                                <span>Close</span>
                                <span uk-icon="icon: close; ratio: 1" type="button" uk-toggle="target: #offcanvas-push" onClick={this.toggleMenu} ></span>
                            </div>
                            <ul>
                                <NavLink to="/cover-letter"><li>Cover Letter</li></NavLink>
                                <NavLink to="/skills"><li>Skills</li></NavLink>
                                <NavLink to='/resume'><li>Resume</li></NavLink>
                                <NavLink to='/portfolio'><li>Portfolio</li></NavLink>
                                <NavLink to='/contact'><li>Contact</li></NavLink>
                                <NavLink to='/'><li onClick={(e)=>this.props.logout(e)}>Logout</li></NavLink>
                            </ul>
                            <Avatar/>
                            <p>Web Developer &amp; Graphic Designer with nearly 10 years of total industry experience, specializing in translating visual concepts into functioning interfaces.</p>
                      
                            <div className="header__offcanvas__footer-info">
                                <p className="u-fine-text">www.marksweitzer.io</p>
                                {/* <button >Download Resume</button>   */}
                            </div>
                         
                        </div>
                    </div>
                </div>
                {/* Mobile */}
                <div className="header__mobile ">
                    <nav className="uk-navbar uk-navbar-container ">
                        <div className="header__mobile__left uk-navbar-left">
                            <img src={logoImg} />
                        </div>
                        <div className="header__mobile__center uk-navbar-center">
                            <span>MARKSWEITZER</span>
                        </div>
                        <div className="header__mobile__right uk-navbar-right">
                            <a className="uk-navbar-toggle" href="#">
                                {closeIcon}
                                {menuIcon}
                            </a>
                        </div>
                    </nav>
                </div>
                <MobileMenu pose={this.state.mobileMenuOpen ? 'show' : 'close'} onClick={(e)=>this.toggleMobileMenu(e)} className="header__mobile__menu">
                    <ul>
                        <NavLink to="/cover-letter"><li>Cover Letter</li></NavLink>
                        <NavLink to="/skills"><li>Skills</li></NavLink>
                        <NavLink to='/resume'><li>Resume</li></NavLink>
                        <NavLink to='/portfolio'><li>Portfolio</li></NavLink>
                        <NavLink to='/contact'><li>Contact</li></NavLink>
                        <NavLink to='/'><li onClick={(e)=>this.props.logout(e)}>Logout</li></NavLink>
                    </ul>
                </MobileMenu>
            </header>
        )
    }
}
export default Header;