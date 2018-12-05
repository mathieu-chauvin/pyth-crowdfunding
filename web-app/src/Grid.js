import React, { Component } from 'react';

import {Grid} from 'semantic-ui-react';
import Miniature from './Miniature.js';

class Grid extends Component {
    render() {
        return (
                <Grid>

                    <Miniature/>
                    <Miniature/>
                    <Miniature/>
                </Grid>
                   )
                }
}

export default Grid;
