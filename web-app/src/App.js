import React, { Component } from 'react';
import {Container, Button} from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';
import GridPro from './GridPro.js';
import ProMenu from './ProMenu.js';
import Profile from './Profile.js';
import AddProject from './AddProject.js';
import Desc from './Desc.js';
import { Web3Provider } from 'react-web3';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

let HomePage = () => {
    return (
            <Container>
                <Link to='/addProject'><Button>Add project</Button></Link>
                <GridPro/>
            </Container>
           )
}
class App extends Component {
  render() {
return (
        <Router>
            <div className="app">
                <ProMenu/>
                <Web3Provider>
                <Route exact path='/' component={HomePage}/>
                <Route path='/profile/' component={Profile}/>
                <Route path='/project/' component={Desc}/>
                <Route path='/addProject/' component={AddProject}/>
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
