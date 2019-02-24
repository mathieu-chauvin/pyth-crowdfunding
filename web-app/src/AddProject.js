import React, { Component } from 'react';

import {Message, Header, Button, Form,Container,TextArea, Input} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactDOM from 'react-dom';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

var route = 'http://localhost:3001'

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state= {
            name:'',
            description:'',
            img:null,
            submitted:false
        };
        this.handleChangeImg = this.handleChangeImg.bind(this)
    }


    handleChange = (e, { name, value }) => this.setState({ [name]: value }); 
    
    handleChangeImg(selectorFiles: FileList)
    {
        let file = selectorFiles[0];
        if(file.type == "image/jpeg" || file.type == "image.png"){
            console.log(file.name);
            this.state.img = file;
        }
    }

    handleSubmit = () => {
        let updateObj = {
            name:this.state.name,
            description:this.state.description,
           owner: this.context.web3.selectedAccount
        };
        var bodyFormData = new FormData();
        bodyFormData.append('image', this.state.img); 
        bodyFormData.set('update',JSON.stringify(updateObj));
        axios({
           method: 'post',
          // headers : {'Content-Type': 'application/x-www-form-urlencoded'},
            url: route+'/api/project/updateProject',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(()=>{
           this.setState({
                submitted:true
           });
        })
           .catch(function (error) {
               console.log(error);
           });
    };

    render() {
                //<Form.Field inline>Description : <TextArea onChange={this.handleChange} name='description' value={this.state.description}/></Form.Field>
       return (
<Container id="display-profile" style={{width:'40%', margin:'auto'}}>
         { this.state.submitted &&
             (<Message positive>
                    <p>New project successfully added</p>
                 </Message>) }
        <Header as='h2'>Add a project</Header> 
           <Form onSubmit={this.handleSubmit}>
                <Form.Field inline>Name : <Input onChange={this.handleChange} name='name' value={this.state.name}  /></Form.Field>
                Icône : <Input type="file" onChange={ (e) => this.handleChangeImg(e.target.files) } name="file" value={this.state.imgs} />
	    <Form.Field inline>Description : <FroalaEditor tag='textarea'/>
                <Form.Button type="submit">Submit</Form.Button> 
</Form.Field>
            </Form>   
           </Container>
                  )
                }
}
AddProject.contextTypes = {
      web3: PropTypes.object
};


export default AddProject;
