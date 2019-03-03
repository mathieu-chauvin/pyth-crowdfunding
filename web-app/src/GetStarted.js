import React, { Component } from 'react'
import {Container, Grid, Menu, Segment } from 'semantic-ui-react'

export default class GetStarted extends Component {
state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

      return (
          <Container>
      
              <h1>What is CrowdPyth ?</h1>
              <p>CrowdPyth is a crowdfunding platform for projects, using a virtual currency : the Pyth (or PTH).

                  People share their ideas of projects, and pay as much money (= PTH) as they want to support them. Then developers realise the projects and get all the money put on it as a reward.

                  Very simple, isn't it ? 
          </p>
    <h1>Quick Install</h1>
    <h2>Install MetaMask</h2>
    <p>
        The first step of your journey is to download the Chrome/Firefox extension Metamask. This extension represents your wallet. Each time you will receive or pay some Pyth(PTH) (= our cryptocurrency), you will use Metamask.


        Please go to this website and follow the instructions : <a href = "https://metamask.io/"> Download Metamask</a>
        <br/>
        If you have trouble installing or starting Metamask, don't hesitate to read their help resources !
    </p>

    <h2>Get some coins !</h2>
    <p>
        Now you have installed Metamask and followed the basic instructions. But as you can see, your wallet is empty ! 

        As we are very kind to new users, we give them free PTH (= money). All you have to do is fill this form and wait a little :<br/>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSchWOTmMvWkYGN9e9sO9GpVhHmojD2YPvGxQXXNuAi53w7ElQ/viewform?usp=sf_link">Link to the form</a>

    </p>

    <h2>Complete your profile</h2>
    <p>
        Click on "Profile", on the top menu bar. You can then complete some information about you, so people can identify you on the platform ;)
    </p>

<h2>Create a project</h2>
    <p>
        Let's say that you have a idea for a wonderful project. Why not to publish it on CrowdPyth ?

        To do that, go to the home page, click on "Add project" and fill the form.
    </p>
    <h2>Support a project</h2>
    <p>
        On the home page, you see one project that is interessant to you, and you would like to support his development.
        By clicking on the project and then on "Make a deposit", you can select the amount of PTH you want to give. The greater the better !
    </p>
    
    <h2>Participate in a project</h2>
    <p>
        You would like to be involved in the development of a project ? Click on the project on the home page, and then on 'Participate' to show your enthusiasm !
        Once the project is finished you will get all or part of the PTH invested in the project. Every work deserves a reward !
    </p>

    </Container>
        )
   }
}

