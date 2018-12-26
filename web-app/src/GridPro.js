import React, { Component } from 'react';

import {Grid, Segment, Card} from 'semantic-ui-react';
import Miniature from './Miniature.js';
import PropTypes from 'prop-types';
let GridElement = () =>  (
                <Miniature />
        );

class GridPro extends Component {

    render() {
    const web3Context = this.context.web3;


        return (<div>
                <p>{JSON.stringify(this.context.web3)}</p><Card.Group centered itemsPerRow={5} stackable>
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
