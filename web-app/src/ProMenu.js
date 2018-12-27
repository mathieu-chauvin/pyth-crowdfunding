import React, { Component } from 'react';

import {Menu, Header} from 'semantic-ui-react';

class ProMenu extends Component {
/*    this.handleClick = (e) => {
        if (this.name == 'home'){

        }
        else if (this.name == 'profile'){
            this.state.direction = 'profile';
        }
    };
  */  
    render() {
        return (
                <Menu>
                    <Menu.Item header as="h1">CrowdPyth</Menu.Item>
                    <Menu.Item name="home"/>
                    <Menu.Item name="profile"/>
                </Menu>
                   )
                }
}

export default ProMenu;
