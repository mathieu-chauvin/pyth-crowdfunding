import React, { Component } from 'react';

import {Grid} from 'semantic-ui-react';
import Miniature from './Miniature.js';

class Grid extends Component {
    const web3 = this.context.web3;


    render() {
        return (
<p>{web3.selectedAccount}</p>
                <Grid>
                    <Miniature/>
                    <Miniature/>
                    <Miniature/>
                </Grid>
                   )
                }
}

export default Grid;
