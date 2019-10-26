import React from 'react';
import Aux from '../../Hoc/Aux/Aux'

const PortfolioItem = (props) => {
    let showLink = <div><span uk-icon="github"></span><a href={props.link}>Github</a></div>
    let baseURL = 'https://msiomedia.s3.us-east-2.amazonaws.com/portfolio/thumbnails/'
    let thumbImg = props.thumbnailImage
    let thumbBackgroundImg = {
        backgroundImage: 'url('+ baseURL + thumbImg + '.jpg'+')',
        backgroundSize: 'cover',
        cursor: 'pointer'
    }
    let items =  
    <div className={`Portfolio__row__item ${!props.visible ? 'u-hide' : null}` } >
        <div className={`Portfolio__row__item__thumb ${props.thumb}`} style={{...thumbBackgroundImg}} data-uk-lightbox >
            <a className="uk-button uk-button-default" href={props.img} data-caption={props.caption}></a>
        </div>
        <h5>{props.title}</h5>
        <p>{props.description}</p>
        {props.link ? showLink : null}
    </div>
    return (
        <Aux>
            {items}
        </Aux>
    );
};
export default PortfolioItem;