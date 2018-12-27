import React, { Component } from 'react';

import {Button, Form,Container, Input} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
var route = 'localhost:3001'

class Profile extends Component {
    componentWillMount() {
        this.setState({
            name:'',
            firstName:'',
            pseudo:''
        });
    }

    componentDidMount() {
        axios.get(route+'/getProfile?id='+this.context.web3.selectedAccount)
            .then((res) => {
                this.setState({name:res.data.name,
                firstName:res.data.firstName,
                pseudo:res.data.pseudo});
            }).catch(function (error) {
                console.log(error);
            });
    }



    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
       axios.post(route+'/updateProfile',{
            id:this.context.web3.selectedAccount,
            pseudo:this.state.pseudo,
            name:this.state.name,
            firstName:this.state.firstName
       })
       .then(()=>{console.log('Success')})
           .catch(function (error) {
               console.log(error);
           });
    };

    render() {
       return (
<Container id="display-profile" style={{width:'40%', margin:'auto'}}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Field inline>Your ethereum adress : <strong>{this.context.web3.selectedAccount}</strong></Form.Field>
                <Form.Field inline>Pseudo : <Input onChange={this.handleChange} name='pseudo' value={this.state.pseudo} /></Form.Field>
                <Form.Field inline>First Name : <Input onChange={this.handleChange} name='firstName' value={this.state.firstName}/></Form.Field>
                <Form.Field inline>Name : <Input onChange={this.handleChange}  name='name' value={this.state.name}/></Form.Field>
               <Form.Button type="submit">Submit</Form.Button> 
            </Form>   
           </Container>
                  )
                }
}
Profile.contextTypes = {
      web3: PropTypes.object
};


export default Profile;
