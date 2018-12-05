import React, { Component } from 'react';

import {Grid, Segment} from 'semantic-ui-react';
import Miniature from './Miniature.js';

let GridElement = () =>  (
        <Grid.Column>
            <Segment>
                <Miniature/>
            </Segment>
        </Grid.Column>
        );

class GridPro extends Component {
    render() {
        return (
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' columns={5} stackable>
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
                </Grid>
                   )
                }
}

export default GridPro;
