import React, { Component } from 'react'
import Format from '../Other/Format';
import FormulaireCommande from './FormulaireCommande';
import Confirmation from '../Other/Confirmation';
import { Router } from 'react-router-dom';
import history from '../Other/History';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ListeCommandes from './ListeCommandes';
import { FaPlus } from 'react-icons/fa';
import { Button } from 'shards-react'
import Contients from '../Contients/Contients';

export default class Commandes extends Component {
// Access webservice

    getCommandes(){
        this.setState({loading: true});
        var req = new Request('http://localhost:8000/api/commandes');
        fetch(req)
        .then(response => {
            response.json().then(data =>{
                var commandes = []
                data.forEach((commande) =>{
                    var temp = {}
                    temp["num"] = commande.numCommande
                    temp["nomclient"] = commande.clientNumClient.nomClient + " " + commande.clientNumClient.prenomClient
                    temp["date"] = new Format().printDate(commande.dateCommande)

                    temp["livree"] = commande.livree? "Livree" : "En cours"
                    temp["etat"] = commande.livree
                    commandes.push(temp)
                })
                    this.setState({dataCommandes: commandes, loading: false, modalChangeConfirmation: false});
                })
        });
    }

    postCommande(formData, ajoutOk){
        var parameters = {
            method: "POST",
            headers:{
              'Content-Type': 'application/json'
            },
              body: JSON.stringify(formData)
        }
        var req = new Request('http://localhost:8000/api/commandes', parameters);
        fetch(req)
        .then(response => {
            if(response.status === 201){
                ajoutOk();
            }
        });
    }

    deleteCommande(id, deleteOk){
        this.setState({loading: true})
        var parameters = {
            method: "DELETE",
            headers:{
            'Content-Type': 'application/json'
            }
        }
        var req = new Request('http://localhost:8000/api/commandes/' + id, parameters);
        fetch(req)
        .then(response => {
                if(response.status === 200){
                    deleteOk();
                }
        });
    }
    putCommande(id, formData,modifyOk){
    var parameters = {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(formData)
    }
    var req = new Request('http://localhost:8000/api/commandes/' + id, parameters);
    fetch(req)
    .then(response => {
        if(response.status === 200){
            modifyOk()
        }
    });
    }
    patchEtatCommande(id, changeOk){
        var parameters = {
            method: "PATCH",
            headers:{
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({'livree' : true})
        }
        var req = new Request('http://localhost:8000/api/commandes/' + id + "/livree", parameters);
        fetch(req)
        .then(response => {
            if(response.status === 204){
                changeOk()
            }
        });
        }

//fin access webservice

// evenements CRUD
handlePanier(event){
    var num = event.currentTarget.id
    history.replace("/main/commandes/contients/"+num)
}

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

etatChangeConfirmed(id){
    this.toggleModalChangeConfirmation()
    this.patchEtatCommande(id, this.refresh);
}

handleAjout(formData){
    this.postCommande(formData, this.refresh);
}

handleEtatChange(event){
    var num = event.currentTarget.id
    this.setState({modifyID: num})
    this.toggleModalChangeConfirmation()
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
toggleModalChangeConfirmation(){
    this.setState({modalChangeConfirmation: !this.state.modalChangeConfirmation})
}
refresh(){
    this.getCommandes()
    this.redirect()
}
// fin evenement Affichage

    constructor(props){
        super(props)
        this.state = { 
            dataCommandes :[],
            deleteID: null,
            modifyID: null,
            loading: true,
            modalConfirmation : false
        }
        this.getCommandes = this.getCommandes.bind(this)
        this.postCommande = this.postCommande.bind(this)
        this.putCommande = this.putCommande.bind(this)
        this.deleteCommande = this.deleteCommande.bind(this)

        this.handlePanier = this.handlePanier.bind(this)
        this.handleSuppression = this.handleSuppression.bind(this)
        this.handleModification = this.handleModification.bind(this)
        this.handleEtatChange = this.handleEtatChange.bind(this)
        this.modificationConfirmed = this.modificationConfirmed.bind(this)
        this.deleteConfirmed = this.deleteConfirmed.bind(this)
        this.handleAjout = this.handleAjout.bind(this)

        this.toggleModalConfirmation = this.toggleModalConfirmation.bind(this)
        this.toggleModalChangeConfirmation = this.toggleModalChangeConfirmation.bind(this)
        this.goToAjout = this.goToAjout.bind(this)
        this.refresh = this.refresh.bind(this)
        this.redirect = this.redirect.bind(this)
    }

    componentDidMount(){
        this.getCommandes()
    }
    render() {
        return (
                <div>
                    <Router history={history}>
                    <Switch>
                        <Route exact path="/main/commandes" component={() => (
                            <div>
            <Button className="m-3 p-2 shadow-sm" style={{float: 'right'}} theme="success" onClick={this.goToAjout}> <FaPlus style={{fontWeight: 'bold', fontSize: '1.5em'}} /> Ajouter </Button>            
            <ListeCommandes onEtatChange={this.handleEtatChange} loading={this.state.loading} onDeleteCommande={this.handleSuppression} onModifyCommande={this.handleModification} onPanierCommande={this.handlePanier}  commandes={this.state.dataCommandes}/></div>)} />
                        <Route path="/main/commandes/contients/:num" component={Contients}/>
                        <Route path="/main/commandes/ajout" component={() =><FormulaireCommande ajout onCancel={this.redirect} onSubmit={this.handleAjout}/>}/>

                        <Route path="/main/commandes/modif" component={() =><FormulaireCommande ajout={false} onCancel={this.redirect} onSubmit={this.modificationConfirmed}/>}/>
                    </Switch>
                </Router> 
                <Confirmation text=" Voulez vous supprimer? " onNo={this.toggleModalConfirmation} onYes={() => {this.deleteConfirmed(this.state.deleteID)} } isOpen={this.state.modalConfirmation} toggle={this.toggleModalConfirmation} />
                <Confirmation text=" Attention vous ne pouvez plus revenir en arriere veuillez verifier ? " onNo={this.toggleModalChangeConfirmation} onYes={() => {this.etatChangeConfirmed(this.state.modifyID)} } isOpen={this.state.modalChangeConfirmation} toggle={this.toggleModalChangeConfirmation} />
                </div>
        )
    }
}
