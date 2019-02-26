import React, { Component } from 'react';

import {Container,Card, Image, Icon, Button } from 'semantic-ui-react';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';



class Miniature extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const MAX_LENGTH = 150;
        var date = new Date(this.props.project.date);
        var options = {year:'numeric', month:'long', day:'numeric', weekday:'short', hour:'numeric', minute:'numeric', second:'numeric'};
        if (this.props.project.description != null) {
            var desc =  this.props.project.description.length > MAX_LENGTH ? this.props.project.description.substr(1, MAX_LENGTH)+' ...' :  this.props.project.description;
        }
        return (
                <Card raised style={{margin:'20px',marginTop:'75px',textAlign:'center'}}>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                <Card.Content>
                <Card.Header>{this.props.project.name}</Card.Header>
                <Card.Meta>
                <span className='date'>{date.toLocaleDateString("en-US", options)}</span>
                </Card.Meta>
                <Card.Description><FroalaEditorView model={desc}/></Card.Description>
                </Card.Content>
                <Card.Content extra>
                <b style={{textAlign:'center',fontSize:'28px'}}>{this.props.project.jackpot} PTH</b><br/>
                </Card.Content>
                </Card>
               );
  }
}

export default Miniature;
