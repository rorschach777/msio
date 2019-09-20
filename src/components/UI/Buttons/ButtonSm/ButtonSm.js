import React from 'react';
import './_ButtonSm.scss';

const ButtonSm = (props) => {
   
    return (

  <a target="_blank" className='Button-sm'  target="_blank"  >
    
    <span>{props.text}</span>
  </a>
 
      


    );
};

export default ButtonSm;