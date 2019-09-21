import React, { Component } from 'react'
import Loading from '../Other/Loading';
import {Row ,Col} from 'shards-react'
import Format from '../Other/Format';
import ListeCommandesMeubles from './ListeCommandesMeubles';
import TableContient from './TableContient'
import { PropTypes } from 'prop-types';
import history from '../Other/History';
export default class Contients extends Component {

// Access webservice

     getCommandesMeubles(){
        this.setState({loading: true});
        var req = new Request('http://localhost:8000/api/commandes/' + this.props.match.params.num + '/contients' );
        fetch(req)
        .then(response => {
            response.json().then(data =>{
                
                var commandesMeubles = []
                data.forEach((commande) =>{
                    var temp = {}
                    temp["nom"] = commande.meubleNumSerie.nomMeuble
                    temp["nombre"] = commande.nombreCommande
                    commandesMeubles.push(temp)
                })
                console.log(commandesMeubles);
                    this.setState({dataCommandesMeubles: commandesMeubles, loading: false});
                })
        });
    }

    postCommandesMeuble(formData, ajoutOk){
        var parameters = {
            method: "POST",
            headers:{
              'Content-Type': 'application/json'
            },
              body: JSON.stringify(formData)
        }
        var req = new Request('http://localhost:8000/api/commandes/' + this.props.match.params.num + '/contients' , parameters);
        fetch(req)
        .then(response => {
            if(response.status === 201){
                ajoutOk();
            }
        });
    }

    deleteCommandesMeuble(id, deleteOk){
        this.setState({loading: true})
        var parameters = {
            method: "DELETE",
            headers:{
            'Content-Type': 'application/json'
            }
        }
        var req = new Request('http://localhost:8000/api/commandes/' + this.props.match.params.num + '/contients/' + id, parameters);
        fetch(req)
        .then(response => {
                if(response.status === 200){
                    deleteOk();
                }
        });
    }
    putCommandesMeuble(id, formData,modifyOk){
    var parameters = {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(formData)
    }
    var req = new Request('http://localhost:8000/api/commandes/' + this.props.match.params.num + '/contients/' + id, parameters);
    fetch(req)
    .then(response => {
        if(response.status === 200){
            modifyOk()
        }
    });
    }

//fin access webservice

// evenements CRUD

handleModification(event){
    var num = event.currentTarget.id
    this.setState({modifyID: num})
    history.replace("/main/commandes/modif/"+num)
}

handleSuppression(event){
    var num = event.currentTarget.id
    this.setState({deleteID: num})
    this.toggleModalConfirmation()
}

modificationConfirmed(formData){
    this.putCommande(this.state.modifyID, formData, this.redirect)
}

deleteConfirmed(id){
    this.toggleModalConfirmation()
    this.deleteCommande(id, this.refresh);
}

handleAjout(formData){
    this.postCommande(formData, this.refresh);
}

// fin evenements CRUD

// evenements Affichage
goToAjout(){
    history.replace("/main/commandes/ajout")
}

redirect(){
    history.push('/temp')
    history.replace('/main/commandes')
}
toggleModalConfirmation(){
    this.setState({modalConfirmation: !this.state.modalConfirmation})
}
refresh(){
    this.getCommandes()
    this.redirect()
}
// fin evenement Affichage

    constructor(props){
        super(props)
        this.state = { 
            contients : [] ,
            loading: false,
            dataCommandesMeubles: []
        }
        this.format = new Format()
        this.getCommandesMeubles = this.getCommandesMeubles.bind(this)
        this.postCommandesMeuble = this.postCommandesMeuble.bind(this)
        this.putCommandesMeuble = this.putCommandesMeuble.bind(this)
        this.deleteCommandesMeuble = this.deleteCommandesMeuble.bind(this)

        this.handleSuppression = this.handleSuppression.bind(this)
        this.handleModification = this.handleModification.bind(this)
        this.modificationConfirmed = this.modificationConfirmed.bind(this)
        this.deleteConfirmed = this.deleteConfirmed.bind(this)
        this.handleAjout = this.handleAjout.bind(this)

        this.toggleModalConfirmation = this.toggleModalConfirmation.bind(this)
        this.goToAjout = this.goToAjout.bind(this)
        this.refresh = this.refresh.bind(this)
        this.redirect = this.redirect.bind(this)
    }
    
    componentDidMount(){
        this.getCommandesMeubles()
    }
    render() {
        return (
                <div>
                <ListeCommandesMeubles loading={this.state.loading} commandesMeubles={this.state.dataCommandesMeubles} />
                </div>
        )
    }
}
