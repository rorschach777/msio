import React, {Component} from 'react';
import './_Portfolio.scss';
import Con1080 from '../../components/UI/Con/Con1080/Con1080';
import PortfolioItem from '../Portfolio/PortfolioItem/PortfolioItem';
import posed from 'react-pose';
import axiosFB from '../../axios/axios';
import Spinner from '../UI/Spinner/Spinner';
const PortfolioParent = posed.div({
    show: {
        delayChildren: 50,
        staggerChildren: 50,
        opacity: 1
    },
    hide: {
        opacity: 0
    }
})
const PortfolioChild = posed.div({
    show: {
        applyAtStart: {display: 'block'},
        x: 0
    },
    hide: {
       applyAtStart: {display: 'none'},
       x: -150

    }
})
class Portfolio extends Component {
    state = {
        staggerParentVisible: true,
        portfolio: []
    }
    filterPortfolio=(type)=>{
       let p = this.state.portfolio
       let updatedPortfolio = []
        p.forEach((cur, idx)=>{
            if(type === cur.type){
                cur = {...cur, visible: true}
            }
            else if (type === 'reset'){
                cur = {...cur, visible: true}
            }
            else {
                cur = {...cur, visible: false}
       
            }
            updatedPortfolio.push(cur)
        })
        this.setState(prevState=>({
            portfolio : [...updatedPortfolio]
        }))
    }
    componentDidMount(){
        axiosFB.get('/portfolio.json')
        .then(portfolio=>{
            let items =  portfolio.data
            this.setState(prevState=>({
                portfolio: [...items]
            }))
        })
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.state !== nextState){
            return true
        }
        else {
            return false
        }
    }
    componentWillUnmount(){
        this.state.portfolio.forEach((cur, idx)=>{
            cur.img = ''
        })
    }
    render(){
        const content = () => {
            if (this.state.portfolio.length === 0) {
                return (
                    <Spinner/>
                )
            }
            else {
                return (
                    <div className="Portfolio__row">
                        <PortfolioParent pose={this.state.staggerParentVisible ? 'show' : 'hide'} >
                            {this.state.portfolio.map((cur, idx) => {
                                return (
                                    <PortfolioChild
                                        key={`portfolio-${idx}`}
                                        pose={cur.visible ? 'show' : 'hide'}>
                                        <PortfolioItem
                                            img={cur.img}
                                            thumb={cur.thumb}
                                            title={cur.title}
                                            description={cur.description}
                                            caption={cur.caption}
                                            link={cur.link}
                                            type={cur.type}
                                            thumbnailImage={cur.thumbImg}
                                            visible={cur.visible}
                                        />
                                    </PortfolioChild>
                                )
                            })}
                        </PortfolioParent>
                    </div>
                )
            }
        }
        return (
            <Con1080>
                <div className="Portfolio">
                    <h1>Portfolio</h1>
                    <ul className="project-type-menu" data-uk-tab>
                        <li ><a href="#" onClick={()=>this.filterPortfolio('JS')}>JavaScript &amp; React</a></li>
                        <li><a href="#" onClick={()=>this.filterPortfolio('GD')}>Graphic Design &amp; UI</a></li>
                        <li><a href="#" onClick={()=>this.filterPortfolio('reset')}>Show All</a></li>
                    </ul>
                    <hr/>
                    {content()}
                </div>
            </Con1080>
        );
    }
   
};

export default Portfolio;