import React, { Component } from 'react';
let e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {liked:false};

    }

    render() {
        if(this.state.liked) {
            return 'You liked this';
        }
        return e (
                'button',
                {onClick:() => this.setState({liked:true}) },
                'Like'
                );
    }
}

class LeftMenu extends React.Component {
   render() {
        return (
                <ul>
            <li>Accueil</li>
            </ul>
            )
   }
}


export default LikeButton;
