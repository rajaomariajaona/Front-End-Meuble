import React, { Component } from 'react'
import { Row, Col } from 'shards-react'
import Loading from '../Other/Loading';
import Commande from './Commande';

export default class Commandes extends Component {
    constructor(props){
        super(props)
        this.state = { 
            commandes : [] ,
            loading: false
        }
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
            <Col md={3}><Commande numcommande={value.numCommande} datecommande={value.dateCommande} /></Col>
        ))
        return (
            <Row>
                {this.state.loading? (<Loading/>):(commandes)}
            </Row>
        )
    }
}
