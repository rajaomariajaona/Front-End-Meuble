import React from 'react';
import Login from "./Components/Login";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './Components/Main/Main';
import NotFound from './Components/Other/NotFound';
export default class App extends React.Component {
  
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/main/" component={Main}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}