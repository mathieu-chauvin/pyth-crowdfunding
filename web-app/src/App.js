import React, { Component } from 'react';
import {Container} from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';
import GridPro from './GridPro.js';
import ProMenu from './ProMenu.js';
import Profile from './Profile.js';
import { Web3Provider } from 'react-web3';

class App extends Component {
  render() {
return (
       
        <div className="app">
            <ProMenu/>
            <Web3Provider>
                <Profile />
            </Web3Provider>
        </div>
    )/*return (
       
        <div className="app">
            <ProMenu/>
            <Web3Provider>
                <Container style={{marginLeft:'auto',marginRight:'auto',maxWidth:'80%'}}>
                    <GridPro/>
                </Container>
            </Web3Provider>
        </div>
    );*/
  }
}

export default App;
