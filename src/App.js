import React from 'react';
import Main from './containers/Main/Main'
import './App.scss';
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
  
      <BrowserRouter>
        <Main/>
      </BrowserRouter>

  );
}

export default App;
