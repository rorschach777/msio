import React from 'react';
import './_Spinner.scss';
const Spinner = () => {
    return (
        <div className="Spinner">
            <span className="uk-margin-small-right" uk-spinner="ratio: 3"></span>
            <span>LOADING</span>
        </div>

    );
};
export default Spinner;