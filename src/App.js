import React from 'react';
import Main from './containers/Main/Main'
import './App.scss';
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main/>
      </BrowserRouter>

    </div>
  );
}

export default App;
