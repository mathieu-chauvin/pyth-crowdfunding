import React, { Component } from 'react';

import {Grid, Segment, Card} from 'semantic-ui-react';
import Miniature from './Miniature.js';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
var route = 'http://localhost:3001'




class GridPro extends Component {
    constructor(props){
        super(props);
        this.state = {projects:[]};
    }
    
    componentDidMount() {

        axios.get(route+'/api/project/getProjects')
            .then((res) => {
                console.log('resProfile:'+JSON.stringify(res));
                 
                this.setState({projects : res.data.data});
                console.log('state:'+JSON.stringify(this.state));
            }).catch(function (error) {
                console.log(error);
            });

        
    }

    render() {
    const web3Context = this.context.web3;


        return (<div>
                <Card.Group style={{margin:'auto', width:'80%'}} centered itemsPerRow={5} stackable>
                {this.state.projects.map((p, i) => {
                      let path = '/project/'+p._id; 
                                                    return (
                            <Link key={i} to={path} ><Miniature project={p} /></Link>
                            )
                   })} 
                </Card.Group>
                   </div>)
                }
}


GridPro.contextTypes = {
      web3: PropTypes.object
};

export default GridPro;
