import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LikeButton from './main_react';

class App extends Component {
  render() {
return (
        <div className="app">
            <LikeButton/>
        </div>
    );
  }
}

export default App;
