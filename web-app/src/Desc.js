import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Table, List, Segment, Divider,Container,Card, Image, Icon, Button, Header } from 'semantic-ui-react';

var route = 'http://localhost:3001'
const RowContributors = (props) => (
        <Table.Row>
        <Table.Cell>{props.pseudo}</Table.Cell>
        <Table.Cell>{props.firstName} {props.name}</Table.Cell>
        <Table.Cell>{props.contribution} PTH</Table.Cell>
        </Table.Row>
)

const TableContributors = (props) => {
      return (
        <Table basic>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Pseudo</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Amount</Table.HeaderCell>
        </Table.Row>
        </Table.Header>      
<Table.Body>
<RowContributors contributor={props.contributors[0]}/>
        </Table.Body>
</Table>
)};


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
        this.addParticipant = this.addParticipant.bind(this);
        this.addContributor = this.addContributor.bind(this);
    }
    
    componentDidMount() {

        axios.get(route+'/api/project/getProject?id='+this.props.match.params.idProject)
            .then((res) => {
                console.log('resProfile:'+JSON.stringify(res));
                 
                this.setState({project : res.data.data});
                console.log('state:'+JSON.stringify(this.state));
            }).catch(function (error) {
                console.log(error);
            });

        
    }

    addParticipant(){
        axios.post(route+'/api/project/addParticipant', {
            id : this.props.match.params.idProject,
             participant :this.context.web3.selectedAccount
        })
            .then((res) => {
                console.log('res addPart:'+JSON.stringify(res));
                 
            }).catch(function (error) {
                console.log(error);
            });


    }

    addContributor(){
        axios.post(route+'/api/project/addContributor', {
            id : this.props.match.params.idProject,
             contributor :this.context.web3.selectedAccount
        })
            .then((res) => {
                console.log('res addPart:'+JSON.stringify(res));
                 
            }).catch(function (error) {
                console.log(error);
            });


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
                        <Button onClick={this.addContributor} color='red' ><Icon name='money bill alternate'/>Make a deposit</Button>
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
                    <TableContributors contributors={this.state.project.contributors}/>
                    <Divider horizontal/>
               </Container>
                    </Segment>
</div>
                    );
  }
}

Desc.contextTypes = {
      web3: PropTypes.object
};


export default Desc;
