import React from 'react';

import './_Avatar.scss';
import avatarImg from '../../../assets/images/avatar/avatar.jpg';
const Avatar = (props) => {
    return (
        <div style={{backgroundImage: `url(${avatarImg})`, backgroundSize: 'cover'}} className="Avatar"></div>
    );
};

export default Avatar;