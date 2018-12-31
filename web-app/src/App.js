import React, { Component } from 'react';
import {Container} from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';
import GridPro from './GridPro.js';
import ProMenu from './ProMenu.js';
import Profile from './Profile.js';
import Desc from './Desc.js';
import { Web3Provider } from 'react-web3';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
class App extends Component {
  render() {
return (
        <Router>
            <div className="app">
                <ProMenu/>
                <Web3Provider>
                <Route exact path='/' component={GridPro}/>
                <Route path='/profile/' component={Profile}/>
                <Route path='/project/' component={Desc}/>
                </Web3Provider>
            </div>
        </Router>
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
