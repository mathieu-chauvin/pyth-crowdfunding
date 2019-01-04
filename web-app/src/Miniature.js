import React, { Component } from 'react';

import {Container,Card, Image, Icon, Button } from 'semantic-ui-react';

class Miniature extends Component {
    render() {
        return (
                <Card raised style={{margin:'20px',marginTop:'75px',textAlign:'center'}}>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                <Card.Content>
                <Card.Header>{this.props.project.name}</Card.Header>
                <Card.Meta>
                <span className='date'></span>
                </Card.Meta>
                <Card.Description>{this.props.project.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <b style={{textAlign:'center',fontSize:'28px'}}>10000 PTH</b><br/>
                </Card.Content>
                </Card>
               );
  }
}

export default Miniature;
