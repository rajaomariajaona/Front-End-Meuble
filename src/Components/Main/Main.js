import React, { Component } from 'react'
import { Container } from 'shards-react';
import Navigation from './Navigation';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Meubles from '../Meuble/Meubles';
import Clients from '../Client/Clients';
import Test from '../../Test';
import Acceuil from './Acceuil';
import Commandes from '../Commande/Commandes';

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = { expanded: false }
    }
    componentDidMount(){
        document.querySelector('#toggler').addEventListener('click', (e) => {
            this.setState({
                expanded: !this.state.expanded
            })
        })
    }
    componentWillUnmount(){
        document.querySelector('#toggler').removeEventListener();
    }
    render() {
        return (
            <div>
            <Navigation />
            <Container style={ this.state.expanded? {paddingLeft: 240} : {paddingLeft: 64}  }>
            <Router>
        <Switch>
        <Route exact path="/main/" component={Acceuil}/>
          <Route path="/main/meubles/" component={Meubles}/> 
          <Route path="/main/commandes/" component={Commandes}/>
          <Route path="/main/clients/" component={Clients}/> 
          <Route path="/main/test/" component={Test}/>
        </Switch>
      </Router>
            </Container>
            </div>
        )
    }
}
