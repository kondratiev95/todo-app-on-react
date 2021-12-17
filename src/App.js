import React from 'react';
import './App.css';

import { Root } from './components/Root';

export class App extends React.Component {
  
  render() {
    return (
      <div className='Todo-App'>
        <h1>todos</h1>
        <Root/>
      </div>
    )
  }
   
}

export default App;
