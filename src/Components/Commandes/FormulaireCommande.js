import React, { Component } from 'react'
import { Col, Button, FormSelect } from 'shards-react';
import DatePicker from 'react-datepicker'
import { Row , Form} from 'shards-react';
import { fr } from 'date-fns/locale';
import Format from '../Other/Format';
import { PropTypes } from 'prop-types';

export default class FormulaireCommande extends Component {
    constructor(props){
        super(props)
        this.state = {
            startDate: new Date(),
            error: false,
            messageError: '',
            clients: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event){
        this.setState({error: false})
        event.preventDefault()
        var formData = Object.fromEntries(new FormData(event.target))
        formData.date_commande = new Format().unformatDate(formData.date_commande)
        console.log(formData);
        
        if(!this.state.error){
            this.props.onSubmit(formData)
        }
    }
    getClients(){
        this.setState({loading: true})
        var req = new Request('http://localhost:8000/api/clients');
        fetch(req)
        .then(response => {
            response.json().then(data =>{
                    this.setState({clients: data, loading: false});
                })
        });
    }

    componentDidMount(){
        this.getClients()
        if(!this.props.ajout){
            var req
            this.setState({loading: true})
            var link = window.location.href.replace("3000", "8000").replace("main", "api").replace("/modif", "")
            req = new Request(link);
            fetch(req)
            .then(response => {
              var client
                response.json().then(data =>{ 
                  client = data
                  this.setState({loading: false})
                }).then(() =>{
                  this.setState({startDate: new Date(client.dateCommande)})
                  document.querySelector("#choix").value = client.clientNumClient.numClient
                })
            });
          }
          
    }

    render() {
        var clientsOption = this.state.clients.map((value, index) => 
            <option key={index} value={value.numClient}> {value.nomClient + " " + value.prenomClient} </option>
        )
        return (
            <Col sm={12}>
            <Form onSubmit={this.handleSubmit}>
            <Row className="mt-4 mb-5">
                <Col md={12}>
                <label htmlFor="choix"> Client : </label>
                    <FormSelect name="num_client" id="choix">
                        {clientsOption}
                    </FormSelect>
                </Col>

                <Col className="my-4" md={12}>
                <Col className="p-0" sm={12}>
                <label htmlFor="date"> Date de commande : </label>
                </Col>
                <Col className="p-0" sm={12}>
                <DatePicker name="date_commande" id="date" locale={fr} dateFormat="dd/MM/yyyy" maxDate={new Date()} selected={this.state.startDate} onChange={date => {this.setState({startDate: date})}} className="form-control" />
                </Col>
                </Col>
                <Col className="p-0" md={4}>
                    <Button  type="submit" className="mx-2" theme="primary">{this.props.ajout? "Cree" : "Modifier"}</Button>
                    <Button onClick={this.props.onCancel} type="reset" className="mx-2" theme="secondary">Annuler</Button>
                </Col>
            </Row>
            
            </Form>
            </Col>
        )
    }
}

FormulaireCommande.propTypes = {
  ajout: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
}
