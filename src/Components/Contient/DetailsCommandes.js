import React, { Component } from 'react'
import { Row, Col } from 'shards-react'
import Format from '../Other/Format';
export default class DetailsCommandes extends Component {
    constructor(props){
        super(props)
        this.state = { 
            nomclient : '' ,
            datecommande : '',
            loading: false
        }
        this.format = new Format()
    }
    getDetails(){
        this.setState({loading: true});
        var req = new Request('http://localhost:8000/api/commandes/' + this.props.numcommande);
        fetch(req)
        .then(response => {
            response.json().then(data =>{  
                    var nom = data.clientNumClient.nomClient + " " +  data.clientNumClient.prenomClient
                    var date = this.format.formatDate(data.dateCommande)

                    this.setState({nomclient: nom, datecommande: date, loading: false});
                })
        });
        
    }
    componentDidMount(){
        this.getDetails()
    }
    render() {
        return (
            <Row className="my-4">
                <Col sm={3} >
                <h5> Commande :  {this.props.numcommande} </h5>
                </Col>
                <Col sm={5} >
                <h5> {this.state.nomclient} </h5>
                </Col>
                <Col sm={4}>
                <p> {this.state.datecommande} </p>
                </Col>
            </Row>
        )
    }
}
