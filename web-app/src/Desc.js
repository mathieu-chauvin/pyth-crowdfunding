import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Table, List, Segment, Divider,Container,Card, Image, Icon, Button, Header } from 'semantic-ui-react';
const TableContributors = () => (
        <Table basic>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Pseudo</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Amount</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>
        <Table.Row>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>JJ</Table.Cell>
        <Table.Cell>6000 PTH</Table.Cell>
        </Table.Row>
        <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>JA</Table.Cell>
        <Table.Cell>4000 PTH</Table.Cell>
        </Table.Row>
</Table.Body>
</Table>
)


class Desc extends Component {
    render() {
        return (
                <div>
                <Link to='/'><Button size='medium'><Icon name='arrow left'/>Back to home</Button></Link>
                <Segment attached>
                <Image size='medium' spaced centered src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                <Container textAlign='center'>
                    <Header as='h2'>Name of project</Header>
                    <i>Date of creation : </i><span className='date'>17 décembre 2018</span>
                    <Divider/>
                <Button.Group size='massive' widths='2'>
                        <Button color='red' ><Icon name='money bill alternate'/>Make a deposit</Button>
                        <Button color ='green' ><Icon name='book'/>Participate</Button>
                     </Button.Group>
    
                        <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='tag' />
                            Description
                        </Header>
                    </Divider>
                    <p>Matthew is a musician living in Nashville. His cryptocurrency project is great !Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                    <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='tag' />
                          Participants 
                           </Header>
                    </Divider>
                <List>
                    <List.Item>Apples</List.Item>
                    <List.Item>Pears</List.Item>
                    <List.Item>Oranges</List.Item>
                  </List>
                    <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='tag' />
                           Contributors
                           </Header>
                    </Divider>
                    <i>Jackpot :</i> <b style={{textAlign:'center',fontSize:'28px'}}>10000 PTH</b>
                    <TableContributors/>
                    <Divider horizontal/>
               </Container>
                    </Segment>
</div>
                    );
  }
}

export default Desc;
