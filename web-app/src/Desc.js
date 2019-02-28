import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Input,Modal, Table, List, Segment, Divider,Container,Card, Image, Icon, Button, Header } from 'semantic-ui-react';
import Web3 from 'web3';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';var config = require('./config')
var coinAbi = require('./abis/coinABI')
var stockAbi = require('./abis/stockABI')
var route = 'http://localhost:3001'
const RowContributors = (props) =>  {
	if (props.contributor != null){
		return(

			<Table.Row>
			<Table.Cell>{props.contributor.pseudo}</Table.Cell>
			<Table.Cell>{props.contributor.firstName} {props.contributor.name}</Table.Cell>
			<Table.Cell>{props.contributor.contribution} PTH</Table.Cell>
			</Table.Row>
		)
	}
	return (<Table.Row></Table.Row>)
}
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
            },
            amount : 0,
            modalOpen:false
        };
        this.addParticipant = this.addParticipant.bind(this);
        this.removeParticipant = this.removeParticipant.bind(this);
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

    handleChange = (e, { name, value }) => this.setState({ [name]: value }); 
    
    getWeb3(){
        // Modern DApp Browsers
        let web3 = null;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try { 
                window.ethereum.enable().then(function() {
                    // User has allowed account access to DApp...
                });
            } catch(e) {
                // User has denied account access to DApp...
            }
        }
        // Legacy DApp Browsers
        else if (window.web3) {
            web3 = new Web3(web3.currentProvider);
        }
        // Non-DApp Browsers
        else {
            alert('You have to install MetaMask !');
        }
        return web3
    }


    addParticipant(){
        axios.post(route+'/api/project/addParticipant', {
            id : this.props.match.params.idProject,
             participant :this.context.web3.selectedAccount
        })
            .then((res) => {
                window.location.reload(); 
            }).catch(function (error) {
                console.log(error);
            });


    }
removeParticipant(){
        axios.post(route+'/api/project/removeParticipant', {
            id : this.props.match.params.idProject,
             participant :this.context.web3.selectedAccount
        })
            .then((res) => {
                window.location.reload(); 
            }).catch(function (error) {
                console.log(error);
            });


    }


    addContributor(){
        // let web3 = new Web3(window.web3.currentProvider);
       this.handleClose() 
        let web3 = window.web3;
        const coinC = web3.eth.contract(coinAbi).at(config.pythAddr);
        const stockC = web3.eth.contract(stockAbi).at(config.stockAddr);
        coinC.increaseAllowance(config.stockAddr,this.state.amount,(err,res) =>  {
            console.log('increase'+res+err+'amount'+this.state.amount);
            stockC.addStake('0x'+this.props.match.params.idProject, this.state.amount, (err,res) =>  {
            console.log('stakeadded'+res+err);
                axios.post(route+'/api/project/addContributor', {
                    id : this.props.match.params.idProject,
                    contributor :this.context.web3.selectedAccount
                })
                    .then((res) => {
                        console.log('res addPart:'+JSON.stringify(res));

                    }).catch(function (error) {
                        console.log(error);
                    });
            });
        });
    }

  handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    renderParticipateButton(){
        console.log(JSON.stringify(this.state.project.participants)+'\n'+this.context.web3.selectedAccount)
        if(this.state.project.participants.find((e)=>{return(e._id==this.context.web3.selectedAccount)}) == undefined){
            return (<Button onClick={this.addParticipant} color ='green' ><Icon name='book'/>Participate</Button>);
        }
        else {
            return (<Button onClick={this.removeParticipant} color ='green' ><Icon name='book'/>Abandon</Button>);
        }
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
                    <Modal id='depositModal' trigger={<Button id='addContributorButton' onClick={this.handleOpen} color='red' ><Icon name='money bill alternate'/>Make a deposit</Button>
                        } basic closeIcon
                       
        open={this.state.modalOpen}
        onClose={this.handleClose} size='massive'>
                        <Header icon='book' content='Make your deposit' />
                        <Modal.Content>
                            <p>
                               Please enter the amount of your deposit : 
                           </p>
                           <Input name='amount' value={this.state.amount} onChange={this.handleChange}/>
                           <Divider/>
                           <p>
                               <i>Tips:</i><br/>
                               If you click on accept, 2 transactions will be displayed by MetaMask. You have to accept both of them, and then wait about 30 seconds for your order to be taken into account.
                           </p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button  onClick={this.handleClose} basic color='red' inverted>
                                <Icon
  name='remove' /> Cancel
                            </Button>
                            <Button color='green' onClick={this.addContributor} inverted>
                                <Icon name='checkmark' /> Confirm
                            </Button>
                        </Modal.Actions>
                    </Modal> 
                    {this.renderParticipateButton()}
                    </Button.Group>
                      
                        <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='tag' />
                            Description
                        </Header>
                    </Divider>
                    <FroalaEditorView model={this.state.project.description}/>                   
                        <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='tag' />
                          Participants 
                           </Header>
                    </Divider>
                <List>
                {this.state.project.participants.map( (p) => {
                                                                return <List.Item>{p.pseudo} ({p.firstName} {p.name})
			</List.Item>
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
