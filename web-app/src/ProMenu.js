import React, { Component } from 'react';
import {BrowserRouter as Router, Browser, Link} from 'react-router-dom';

import {Menu, Header} from 'semantic-ui-react';

class ProMenu extends Component {
   render() {
        return (
                <Menu>    
                    <Menu.Item header as="h1">CrowdPyth</Menu.Item>

                    <Link to='/'>
                        <Menu.Item name="home"/>
                    </Link>
                    <Link to='/profile/'>
                        <Menu.Item name="profile"/>
                        </Link>
                        <Link to='/get-started/'>
                        <Menu.Item name="Get Started"/>
                    </Link>

                </Menu>
                   )
                }
}

export default ProMenu;
