import React, { Component } from 'react'
import { Container, Row } from 'shards-react';
import Navigation from './Navigation';
import { Router, Route, Switch} from 'react-router-dom';
import Meubles from '../Meuble/Meubles';
import Clients from '../Clients/Clients';
import Test from '../../Test';
import Acceuil from './Acceuil'
import { createBrowserHistory } from 'history';
import history from '../Other/History';
import Categories from '../Meuble/Categorie/Categories'
import Contients from '../Contient/Contients';
import Commandes from '../Commandes/Commandes';

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = { expanded: false }
        this.history = createBrowserHistory()
    }
    componentDidMount(){
        document.querySelector('#toggler').addEventListener('click', () => {
            this.setState({expanded: !this.state.expanded})
        })
    }
    componentWillUnmount(){
        document.querySelector('#toggler').removeEventListener()
    }
    render() {
        return (
            <div>
            <Row className="bg-secondary shadow" style={{height: 100}}>

            </Row>
            <Navigation />
            <Container style={ this.state.expanded? {paddingLeft: 240} : {paddingLeft: 64}  }>
        <Router history={history}>
        <Switch>
        <Route exact path="/main/" component={Acceuil}/>
          <Route path="/main/meubles/listes" component={Meubles}/> 
          <Route path="/main/meubles/categories" component={Categories}/> 
          <Route path="/main/commandes/:numcommande" component={Contients}/>
          <Route path="/main/commandes/" component={Commandes}/>
          <Route path="/main/clients/" component={Clients}/> 
          <Route path="/main/test/" component={Test}/>
          <Route component={() => <h1> ERROR </h1>}/>
        </Switch>
      </Router>
            </Container>
            </div>
        )
    }
}
