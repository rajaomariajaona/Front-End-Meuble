import React, { Component } from 'react'
import { Button } from 'shards-react';
import TableauListe from './TableauListe';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FormulaireClient from './FormulaireClient';
import Loading from '../Other/Loading';

export default class Clients extends Component {
    constructor(props){
        super(props)
        this.state ={client :[],loading: true}
        
        this.modify = this.modify.bind(this)
        
    }

    toggleModalClientAjout(e){
        this.setState({modalClientAjout : !this.state.modalClientAjout});
    }
    modify(e){
        var num = e.currentTarget.id.replace("mod", "")
        window.location.replace("/main/clients/modif/"+num)
    }
    getClient(){
        this.setState({loading: true})
        var req = new Request('http://localhost:8000/api/clients');
        fetch(req)
        .then(response => {
            response.json().then(data =>{
                    this.setState({clients: data, loading: false});
                })
        });
    }

    componentDidMount() {
        this.getClient();
    }
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/main/clients" component={() => this.state.loading? (<Loading/>):( <div>
                        <TableauListe onModifyClient={this.modify}  clients={this.state.clients}/> <Button theme="success" href="/main/clients/ajout">Ajouter</Button> </div> )}/>

                        <Route path="/main/clients/ajout" component={() =><FormulaireClient ajout onSubmit={this.postClient} hrefCancel="/main/clients"/>}/>

                        <Route path="/main/clients/modif" component={() =><FormulaireClient ajout={false} onSubmit={this.putClient} hrefCancel="/main/clients"/>}/>

                    </Switch>
                </Router>
            </div>
        )
    }
}