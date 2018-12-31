import React, { Component } from 'react';

import {Grid, Segment, Card} from 'semantic-ui-react';
import Miniature from './Miniature.js';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
let GridElement = () =>  (
                <Link to='/project/'><Miniature /></Link>
        );

class GridPro extends Component {

    render() {
    const web3Context = this.context.web3;


        return (<div>
                <Card.Group style={{margin:'auto', width:'80%'}} centered itemsPerRow={5} stackable>
                    <GridElement/>
                    <GridElement/>
                    <GridElement/>
                    <GridElement/>
                    <GridElement/>
                    <GridElement/>
                    <GridElement/>
                    <GridElement/>
                    <GridElement/>
                    <GridElement/>
                </Card.Group>
                   </div>)
                }
}


GridPro.contextTypes = {
      web3: PropTypes.object
};

export default GridPro;
