import React, { Component } from 'react'
import {Button} from 'shards-react'
import Format from '../Other/Format';
import ListeCommandesMeubles from './ListeCommandesMeubles';
import { PropTypes } from 'prop-types';
import history from '../Other/History';
import { Router, Switch, Route } from 'react-router-dom';
import Confirmation from '../Other/Confirmation';
import { FaPlus } from 'react-icons/fa';
import FormulaireCommandesMeubles from './FormulaireCommandesMeubles';
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
                    temp["num"] = commande.meubleNumSerie.numSerie
                    temp["nom"] = commande.meubleNumSerie.nomMeuble
                    temp["prixUnitaire"] = this.format.formatPrix(commande.meubleNumSerie.prix + "")
                    temp["prix"] = this.format.formatPrix((commande.meubleNumSerie.prix * commande.nombreCommande) + "")
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
    this.putCommandesMeuble(this.state.modifyID, formData, this.redirect)
}

deleteConfirmed(id){
    this.toggleModalConfirmation()
    this.deleteCommandesMeuble(id, this.refresh);
}

handleAjout(formData){
    this.postCommandesMeuble(formData, this.refresh);
}

// fin evenements CRUD

// evenements Affichage
goToAjout(){
    history.replace("/main/commandes/contients/" + this.props.match.params.num + "/ajout")
}

redirect(){
    history.push('/temp')
    history.replace('/main/commandes/contients/' + this.props.match.params.num)
}
toggleModalConfirmation(){
    this.setState({modalConfirmation: !this.state.modalConfirmation})
}
refresh(){
    this.getCommandesMeubles()
    this.redirect()
}
// fin evenement Affichage

    constructor(props){
        super(props)
        this.state = {
            deleteID: null,
            modifyID: null,
            modalConfirmation : false,
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
                <Router history={history}>
                    <Switch>
                        <Route exact path="/main/commandes/contients/:num" component={() => (
                            <div>
            <Button className="m-3 p-2 shadow-sm" style={{float: 'right'}} theme="success" onClick={this.goToAjout}> <FaPlus style={{fontWeight: 'bold', fontSize: '1.5em'}} /> Ajouter </Button>            
            <ListeCommandesMeubles loading={this.state.loading} onDeleteCommande={this.handleSuppression} onModifyCommande={this.handleModification} onPanierCommande={this.handlePanier}  commandesMeubles={this.state.dataCommandesMeubles}/></div>)} />
                        <Route path="/main/commandes/contients/:num/ajout" component={() =><FormulaireCommandesMeubles ajout onCancel={this.redirect} onSubmit={this.handleAjout}/>}/>

                        <Route path="/main/commandes/contients/:num/modif" component={() =><FormulaireCommandesMeubles ajout={false} onCancel={this.redirect} onSubmit={this.modificationConfirmed}/>}/>
                    </Switch>
                </Router> 
                <Confirmation text=" Voulez vous supprimer? " onNo={this.toggleModalConfirmation} onYes={() => {this.deleteConfirmed(this.state.deleteID)} } isOpen={this.state.modalConfirmation} toggle={this.toggleModalConfirmation} />
                </div>
        )
    }
}

Contients.propTypes = {
  match: PropTypes.any
}
