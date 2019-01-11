import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import {Table, List, Segment, Divider,Container,Card, Image, Icon, Button, Header } from 'semantic-ui-react';

var route = 'http://localhost:3001'
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
    constructor(props){
        super(props);
        this.state = {project:
            {
                name:"",
                description:"",
                date:"",
                jackpot:"",
                participants:[],
                contributors:[]
            }
        };
    }
    
    componentDidMount() {

        axios.get(route+'/api/project/getProject?id='+this.props.match.params.idProject)
            .then((res) => {
                console.log('resProfile:'+JSON.stringify(res));
                 
                this.setState({project : res.data.data[0]});
                console.log('state:'+JSON.stringify(this.state));
            }).catch(function (error) {
                console.log(error);
            });

        
    }

    addParticipant(){
        
    }

    render() {
        return (
                <div>
                <Link to='/'><Button size='medium'><Icon name='arrow left'/>Back to home</Button></Link>
                <Segment attached>
                <Image size='medium' spaced centered src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                <Container textAlign='center'>
                    <Header as='h2'>{this.state.project.name}</Header>
                    <i>Date of creation : </i><span className='date'>{this.state.project.date}</span>
                    <Divider/>
                <Button.Group size='massive' widths='2'>
                        <Button color='red' ><Icon name='money bill alternate'/>Make a deposit</Button>
                        <Button onClick={this.addParticipant} color ='green' ><Icon name='book'/>Participate</Button>
                     </Button.Group>
    
                        <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='tag' />
                            Description
                        </Header>
                    </Divider>
                    <p>{this.state.project.description}</p>
                    <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='tag' />
                          Participants 
                           </Header>
                    </Divider>
                <List>
                {this.state.project.participants.map( (p) => {
                                                                return <List.Item>{p.name}</List.Item>
                                                            })}
                    
                  </List>
                    <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='tag' />
                           Contributors
                           </Header>
                    </Divider>
                    <i>Jackpot :</i> <b style={{textAlign:'center',fontSize:'28px'}}>{this.state.project.jackpot} PTH</b>
                    <TableContributors/>
                    <Divider horizontal/>
               </Container>
                    </Segment>
</div>
                    );
  }
}

export default Desc;
