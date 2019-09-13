import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Acceuil from "./Components/Acceuil";
import Clients from './Components/Client/Clients';
import Test from './Test';
import Meubles from './Components/Meuble/Meubles';


export default class App extends React.Component {
  
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/meubles" component={Meubles}/> 
          <Route path="/clients" component={Clients}/> 
          <Route path="/test" component={Test}/> 
          <Route path="/" component={Acceuil} />
        </Switch>
      </Router>
       
    );
  }
}