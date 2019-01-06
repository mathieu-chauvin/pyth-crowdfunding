import React, { Component } from 'react';

import {Message, Header, Button, Form,Container,TextArea, Input} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
var route = 'http://localhost:3001'

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state= {
            name:'',
            description:'',
            submitted:false
        };
    }


    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        let updateObj = {
            name:this.state.name,
            description:this.state.description
       };
        axios({
           method: 'post',
          // headers : {'Content-Type': 'application/x-www-form-urlencoded'},
            url: route+'/api/project/updateProject',
             data: {
                   id: this.context.web3.selectedAccount,
                     update:updateObj 
             }}).then(()=>{
           this.setState({
                submitted:true
           });
        })
           .catch(function (error) {
               console.log(error);
           });
    };

    render() {
       return (
<Container id="display-profile" style={{width:'40%', margin:'auto'}}>
         { this.state.submitted &&
             (<Message positive>
                    <p>New project successfully added</p>
                 </Message>) }

        <Header as='h2'>Add a project</Header> 
           <Form onSubmit={this.handleSubmit}>
                <Form.Field inline>Name : <Input onChange={this.handleChange} name='name' value={this.state.name}  /></Form.Field>
                <Form.Field inline>Description : <TextArea onChange={this.handleChange} name='description' value={this.state.description}/></Form.Field>
               <Form.Button type="submit">Submit</Form.Button> 
            </Form>   
           </Container>
                  )
                }
}
AddProject.contextTypes = {
      web3: PropTypes.object
};


export default AddProject;
