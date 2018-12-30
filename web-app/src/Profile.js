import React, { Component } from 'react';

import {Button, Form,Container, Input} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
var route = 'http://localhost:3001'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state= {
            name:'',
            firstName:'',
            pseudo:'',
            defaultPseudo:'undefined',
            defaultFirstName:'undefined',
            defaultName:'undefined'
        };
    }

    componentDidMount() {

        axios.get(route+'/api/getProfile?id='+this.context.web3.selectedAccount)
            .then((res) => {
                console.log('resProfile:'+JSON.stringify(res));
                
                this.setState({defaultName:res.data.data.name,
                    defaultFirstName:res.data.data.firstName,
                    defaultPseudo:res.data.data.pseudo});
                console.log('state:'+JSON.stringify(this.state));
            }).catch(function (error) {
                console.log(error);
            });

        
    }
    
    

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        let updateObj = {
            pseudo:this.state.pseudo,
            name:this.state.name,
            firstName:this.state.firstName
       };
        axios({
           method: 'post',
          // headers : {'Content-Type': 'application/x-www-form-urlencoded'},
            url: route+'/api/updateProfile',
             data: {
                   id: this.context.web3.selectedAccount,
                     update:updateObj 
             }}).then(()=>{
           this.setState({
               defaultPseudo : this.state.pseudo.length > 0 ? this.state.pseudo : 'pseudoUndefined',
            defaultName : this.state.name.length > 0 ? this.state.name : 'nameUndefined',
            defaultFirstName : this.state.firstName.length > 0 ? this.state.firstName : 'firstNameUndefined'
           });
        })
           .catch(function (error) {
               console.log(error);
           });
    };

    render() {
       return (
<Container id="display-profile" style={{width:'40%', margin:'auto'}}>
<p> Hello {this.state.defaultPseudo || undefined} ({this.state.defaultFirstName} {this.state.defaultName})</p>
                <Form onSubmit={this.handleSubmit}>
                <Form.Field inline>Your ethereum adress : <strong>{this.context.web3.selectedAccount}</strong></Form.Field>
                <Form.Field inline>Pseudo : <Input onChange={this.handleChange} name='pseudo' value={this.state.pseudo}  /></Form.Field>
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
