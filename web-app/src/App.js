import React, { Component } from 'react';
import {Container} from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';
import GridPro from './GridPro.js';
import ProMenu from './ProMenu.js';
class App extends Component {
  render() {
return (
        <div className="app">
            <ProMenu/>
            <Container style={{marginLeft:'auto',marginRight:'auto',maxWidth:'80%'}}>
                <GridPro/>
            </Container>
        </div>
    );
  }
}

export default App;
