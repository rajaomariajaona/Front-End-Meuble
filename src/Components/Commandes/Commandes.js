import React, { Component } from 'react'
import { Row, Col } from 'shards-react'
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
                    temp["date"] = new Format().formatDate(commande.dateCommande)
                    commandes.push(temp)
                })
                    this.setState({dataCommandes: commandes, loading: false});
                })
        });
    }

    postCommandes(formData, ajoutOk){
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

    deleteCommandes(id, deleteOk){
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
    putCommandes(id, formData,modifyOk){
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
    this.putCommandes(this.state.modifyID, formData, this.redirect)
}

deleteConfirmed(id){
    this.toggleModalConfirmation()
    this.deleteCommandes(id, this.refresh);
}

handleAjout(formData){
    this.postCommandes(formData, this.refresh);
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
            dataCommandes :[],
            deleteID: null,
            modifyID: null,
            loading: true,
            modalConfirmation : false
        }
        this.format = new Format()
        this.handleSuppression = this.handleSuppression.bind(this)
        this.handleModification = this.handleModification.bind(this)
        this.handleAjout = this.handleAjout.bind(this)
        this.goToAjout = this.goToAjout.bind(this)
        this.modificationConfirmed = this.modificationConfirmed.bind(this)
    }

    componentDidMount(){
        this.getCommandes()
        console.log(this.state.dataCommandes);
        
    }
    render() {
        return (
                <div>
                    <Router history={history}>
                    <Switch>
                        <Route exact path="/main/commandes" component={() => (


                            <div>
            <Button className="m-3 p-2 shadow-sm" style={{float: 'right'}} theme="success" onClick={this.goToAjout}> <FaPlus style={{fontWeight: 'bold', fontSize: '1.5em'}} /> </Button>            
            <ListeCommandes loading={this.state.loading} onDeleteClient={this.handleSuppression} onModifyClient={this.handleModification}  commandes={this.state.dataCommandes}/></div>)} />

                        <Route path="/main/commandes/ajout" component={() =><FormulaireCommande ajout onCancel={this.redirect} onSubmit={this.handleAjout}/>}/>

                        <Route path="/main/commandes/modif" component={() =><FormulaireCommande ajout={false} onCancel={this.redirect} onSubmit={this.modificationConfirmed}/>}/>

                    </Switch>
                </Router> 
                <Confirmation text=" Voulez vous supprimer? " onNo={this.toggleModalConfirmation} onYes={() => {this.deleteConfirmed(this.state.deleteID)} } isOpen={this.state.modalConfirmation} toggle={this.toggleModalConfirmation} />
                </div>
        )
    }
}
