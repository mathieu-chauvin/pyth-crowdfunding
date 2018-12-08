import React, { Component } from 'react';

import {Grid, Segment, Card} from 'semantic-ui-react';
import Miniature from './Miniature.js';

let GridElement = () =>  (
                <Miniature />
        );

class GridPro extends Component {
    render() {
        return (
                <Card.Group centered itemsPerRow={5} stackable>
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
                   )
                }
}

export default GridPro;
