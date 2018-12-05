import React, { Component } from 'react';

import {Container,Card, Image, Icon, Button } from 'semantic-ui-react';

class Miniature extends Component {
    render() {
        return (
                <Card border='0px'>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                <Card.Content>
                <Card.Header>Name of project</Card.Header>
                <Card.Meta>
                <span className='date'>17 décembre 2018</span>
                </Card.Meta>
                <Card.Description>Matthew is a musician living in Nashville. His cryptocurrency project is great !</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Button><Icon name='money bill alternate'/></Button>
                </Card.Content>
                </Card>
               );
  }
}

export default Miniature;
