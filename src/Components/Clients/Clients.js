import React, { Component } from 'react'
import { Button } from 'shards-react';
import ListeClients from './ListeClients';
import { Router, Switch, Route } from "react-router-dom";
import FormulaireClient from './FormulaireClient';
import history from '../Other/History';
import Format from '../Other/Format';
import Confirmation from '../Other/Confirmation'
import { FaPlus } from 'react-icons/fa';

export default class Clients extends Component {

// Access web service
    getClients(){
        this.setState({loading: true})
        var req = new Request('http://localhost:8000/api/clients');
        fetch(req)
        .then(response => {
            if(response.status === 200){
                response.json().then(data =>{
                    var clients = []
                    data.forEach((client) =>{
                        var temp = {}
                        temp["num"] = client.numClient
                        temp["nom"] = client.nomClient
                        temp["prenom"] = client.prenomClient
                        temp["tel"] = new Format().formatTel(client.telClient)
                        temp["email"] = client.emailClient
                        temp["adresse"] = client.adresseClient
                        temp["province"] = client.provinceClient.province
                        temp["cp"] = client.cpClient
                        clients.push(temp)
                    })
                    this.setState({loading: false, dataClients: clients});
                    return 1
                })
            }else{
                return Number(response.status)
            }
        });
    }

    deleteClient(id, deleteOk){
        this.setState({loading: true})
        var parameters = {
            method: "DELETE",
            headers:{
              'Content-Type': 'application/json'
            }
        }
        var req = new Request('http://localhost:8000/api/clients/' + id, parameters);
        fetch(req)
        .then(response => {
                if(response.status === 200){
                    deleteOk();
                }
        });
    }

    postClient(formData, ajoutOk){
        var parameters = {
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
            body: JSON.stringify(formData)
      }
      var req = new Request('http://localhost:8000/api/clients', parameters);
      fetch(req)
      .then(response => {
        if(response.status === 201){
            ajoutOk();
        }
      });
    }

    putClient(id, formData,modifyOk){
      var parameters = {
          method: "PUT",
          headers:{
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(formData)
      }
      var req = new Request('http://localhost:8000/api/clients/' + id, parameters);
      fetch(req)
      .then(response => {
          if(response.status === 200){
              modifyOk()
          }
      });
    }

// fin access web service

// evenements CRUD
    handleModification(event){
        var num = event.currentTarget.id
        this.setState({modifyID: num})
        history.replace("/main/clients/modif/"+num)
    }

    handleSuppression(event){
        var num = event.currentTarget.id
        this.setState({deleteID: num})
        this.toggleModalConfirmation()
    }

    modificationConfirmed(formData){
        this.putClient(this.state.modifyID, formData, this.redirect)
    }

    deleteConfirmed(id){
        this.toggleModalConfirmation()
        this.deleteClient(id, this.refresh);
    }

    handleAjout(formData){
        this.postClient(formData, this.refresh);
    }
    
// fin evenements CRUD

// evenements Affichage
    goToAjout(){
        history.replace("/main/clients/ajout")
    }

    redirect(){
        history.push('/temp')
        history.replace('/main/clients')
    }
    toggleModalConfirmation(){
        this.setState({modalConfirmation: !this.state.modalConfirmation})
    }
    refresh(){
        this.getClients()
        this.redirect()
    }
// fin evenement Affichage

    constructor(props){
        super(props)
        this.state ={
            dataClients :[],
            deleteID: null,
            modifyID: null,
            loading: true,
            modalConfirmation : false,
        }
        this.handleSuppression = this.handleSuppression.bind(this)
        this.handleModification = this.handleModification.bind(this)
        this.handleAjout = this.handleAjout.bind(this)
        this.goToAjout = this.goToAjout.bind(this)
        this.modificationConfirmed = this.modificationConfirmed.bind(this)
    }
    componentDidMount() {        
        this.getClients();        
    }
    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/main/clients" component={() => (
                            <div>
            <Button className="m-3 p-2 shadow-sm" style={{float: 'right'}} theme="success" onClick={this.goToAjout}> <FaPlus style={{fontWeight: 'bold', fontSize: '1.5em'}} /> </Button>            
            <ListeClients loading={this.state.loading} onDeleteClient={this.handleSuppression} onModifyClient={this.handleModification}  clients={this.state.dataClients}/></div>)} />

                        <Route path="/main/clients/ajout" component={() =><FormulaireClient ajout onCancel={this.redirect} onSubmit={this.handleAjout}/>}/>

                        <Route path="/main/clients/modif" component={() =><FormulaireClient ajout={false} onCancel={this.redirect} onSubmit={this.modificationConfirmed}/>}/>

                    </Switch>
                </Router> 
                <Confirmation text=" Voulez vous supprimer? " onNo={this.toggleModalConfirmation} onYes={() => {this.deleteConfirmed(this.state.deleteID)} } isOpen={this.state.modalConfirmation} toggle={this.toggleModalConfirmation} />
            </div>
        )
    }
}