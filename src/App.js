import React, { Component } from 'react';
// import logo from './logo.svg';
import ScriptRemind from './scriptRemind.js';
import SymptomEntry from './symptomEntry.js';
import './App.css';

class App extends Component {
  render() {
    return (
       <div>
         <ul className="navigation">
           <li className="nav-item">Home</li>
           <li className="nav-item">Portfolio</li>
         </ul>
       {/* <label for="nav-trigger"></label> */}
        <div>
          <ScriptRemind />
        </div>
        <div>
          <SymptomEntry />
        </div>
      </div>
     )
    // return (
    //   <div className="App">
    //     <div className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h2>Welcome to React</h2>
    //     </div>
    //     <p className="App-intro">
    //       To get started, edit <code>src/App.js</code> and save to reload.
    //     </p>
    //   </div>
    // );
  }
}

export default App;
