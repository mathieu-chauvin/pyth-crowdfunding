import React, { Component } from 'react';

import {Menu, Header} from 'semantic-ui-react';

class ProMenu extends Component {
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
