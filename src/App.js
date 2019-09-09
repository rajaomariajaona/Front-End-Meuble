import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Acceuil from "./Components/Acceuil";
import Client from './Components/Client/Client';
import Test from './Test';


export default class App extends React.Component {
  
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/clients" component={Client}/> 
          <Route path="/test" component={Test}/> 
          <Route path="/" component={Acceuil} />
        </Switch>
      </Router>
       
    );
  }
}