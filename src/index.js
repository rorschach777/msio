import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux'
import App from './App';
// Reducers
import mainReducer from './store/reducers/mainReducer';
import authenticationReducer from './store/reducers/authenticationReducer';
import contactFormReducer from './store/reducers/contactFormReducer';
import skillsReducer from './store/reducers/skillsReducer';
import coverLetterReducer from './store/reducers/coverLetterReducer';

import thunk from 'redux-thunk';

// Redux Specific
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    main: mainReducer,
    authentication: authenticationReducer,
    contact: contactFormReducer,
    skills: skillsReducer,
    coverLetter: coverLetterReducer
})
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

