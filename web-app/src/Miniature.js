import React, { Component } from 'react';

import {Container,Card, Image, Icon, Button } from 'semantic-ui-react';

class Miniature extends Component {
    render() {
        var date = new Date(this.props.project.date);
        var options = {year:'numeric', month:'long', day:'numeric', weekday:'short', hour:'numeric', minute:'numeric', second:'numeric'};

        return (
                <Card raised style={{margin:'20px',marginTop:'75px',textAlign:'center'}}>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                <Card.Content>
                <Card.Header>{this.props.project.name}</Card.Header>
                <Card.Meta>
                <span className='date'>{date.toLocaleDateString("en-US", options)}</span>
                </Card.Meta>
                <Card.Description>{this.props.project.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <b style={{textAlign:'center',fontSize:'28px'}}>{this.props.project.jackpot} PTH</b><br/>
                </Card.Content>
                </Card>
               );
  }
}

export default Miniature;
