import React, { Component } from 'react'
import { Row, Col } from 'shards-react'
import Loading from '../Other/Loading';
import Commande from './Commande';
import Format from '../Other/Format';
import FormulaireCommande from './FormulaireCommande';

export default class Commandes extends Component {
    constructor(props){
        super(props)
        this.state = { 
            commandes : [] ,
            loading: false
        }
        this.format = new Format()
    }
    getCommandes(){
        this.setState({loading: true});
        var req = new Request('http://localhost:8000/api/commandes');
        fetch(req)
        .then(response => {
            response.json().then(data =>{
                    this.setState({commandes: data, loading: false});
                })
        });
    }
    componentDidMount(){
        this.getCommandes()
    }
    render() {
        var commandes = this.state.commandes.map((value,index) => (
            <Col key={index} md={4}><Commande className="my-2" client={value.clientNumClient.nomClient + " " + value.clientNumClient.prenomClient} numcommande={value.numCommande} datecommande={this.format.formatDate(value.dateCommande)} /></Col>
        ))
        return (
                <div>
                    <Row>
                        <FormulaireCommande />
                    </Row>
                    {this.state.loading? (<Loading/>):(<Row>{commandes}</Row>)}
                </div>
        )
    }
}
