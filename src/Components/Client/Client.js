import React, { Component } from 'react'
import { Container, Button } from 'reactstrap';
import TableauListe from './TableauListe';
import ModalClient from './ModalClient';
import Confirmation from '../Other/Confirmation';

export default class Client extends Component {
    constructor(props){
        super(props)
        this.state ={ modalConfirmation : false,
            modalClientAjout : false,
            modalClientModif : false,
            modalType: "Ajout",
            client :[],
            deleteID: '',
            modifyID: ''
        }
        this.addValue = this.addValue.bind(this)
        this.toggleModalConfirmation = this.toggleModalConfirmation.bind(this)
        this.toggleModalClientModif = this.toggleModalClientModif.bind(this)
        this.toggleModalClientAjout = this.toggleModalClientAjout.bind(this)
        this.postClient = this.postClient.bind(this)
        this.putClient = this.putClient.bind(this)
        this.deleteClient = this.deleteClient.bind(this)
    }
    addValue(){
        var numClient = this.state.modifyID
        var req = new Request('http://localhost:8000/api/clients/'+ numClient);
        var client;
        fetch(req)
        .then(response => {
            response.json().then(data =>{
                    client = data;
                }).then(()=>{
                    document.querySelector("#nom").value = client.nomClient
                    document.querySelector("#prenom").value = client.prenomClient
                    document.querySelector("#adresse").value = client.adresseClient
                    document.querySelector("#province").value = client.provinceClient.province
                    document.querySelector("#cp").value = client.cpClient
                    document.querySelector("#email").value = client.emailClient
                    document.querySelector("#tel").value = client.telClient
                })
        });
        
    }
    toggleModalConfirmation(e){
        if(e){
            this.setState({
                modalConfirmation : !this.state.modalConfirmation,
                deleteID: e.currentTarget.id.replace("del", "")
            })
        }else{
            this.setState({
                modalConfirmation : !this.state.modalConfirmation
            })
        }

    }
    toggleModalClientAjout(e){
        this.setState({modalClientAjout : !this.state.modalClientAjout});
    }
    toggleModalClientModif(e){
        if(e){
            
            this.setState({
                modalClientModif : !this.state.modalClientModif,
                modifyID: e.currentTarget.id.replace("mod", "")
            });
        }else{
            this.setState({modalClientModif : !this.state.modalClientModif});
        }
    }
    getClient(){
        var req = new Request('http://localhost:8000/api/clients');
        fetch(req)
        .then(response => {
            response.json().then(data =>{
                    this.setState({clients: data});
                })
        });
    }

    postClient(e){
        e.preventDefault();
        var formData = new FormData(e.target);
        var parameters = {
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
            body: JSON.stringify(Object.fromEntries(formData))
      }
      var req = new Request('http://localhost:8000/api/clients', parameters);
      fetch(req)
      .then(response => {
          if(response.status === 201){
            this.toggleModalClientAjout()
            this.getClient();
          }
      });
      }
    deleteClient(){
        this.toggleModalConfirmation()
        var numClient = this.state.deleteID
        var parameters = {
            method: "DELETE"
        }
        var req = new Request('http://localhost:8000/api/clients/' + numClient, parameters);
        fetch(req)
        .then(response => {
            
            if(response.status === 200){
                this.getClient();
            }
        });
    }
    putClient(e){
        e.preventDefault()
        var numClient = this.state.modifyID
        var formData = new FormData(e.target)
        var parameters = {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(Object.fromEntries(formData))
        }
        var req = new Request('http://localhost:8000/api/clients/' + numClient, parameters);
        fetch(req)
        .then(response => {
            if(response.status === 200){
                this.getClient();
                this.toggleModalClientModif()
            }
        });
    }
    componentDidMount() {
        this.getClient();
    }
    render() {
        return (
            <Container>
                <TableauListe onDeleteClient={this.toggleModalConfirmation} onModifyClient={this.toggleModalClientModif} clients={this.state.clients}/>

                <ModalClient ajout={true} modalType="Ajout" onSubmit={this.postClient} isOpen={this.state.modalClientAjout} onCancel={this.toggleModalClientAjout}/>

                <ModalClient addValue={this.addValue} ajout={false} modalType="Modification" onSubmit={this.putClient} isOpen={this.state.modalClientModif} onCancel={this.toggleModalClientModif}/>

                <Confirmation text=" Voulez vous supprimer? " onNo={this.toggleModalConfirmation} onYes={this.deleteClient} isOpen={this.state.modalConfirmation} toggle={this.toggleModalConfirmation} />

                <Button color="success" onClick={this.toggleModalClientAjout}>Ajouter</Button>
            </Container>
        )
    }
}