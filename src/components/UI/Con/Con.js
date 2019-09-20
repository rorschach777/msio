import React from 'react';
import './_Con.scss'
const Con = (props) => {
    return (
        <div className='Con'>
            {props.children}
        </div>
    );
};

export default Con;