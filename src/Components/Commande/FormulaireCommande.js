import React, { Component } from 'react'
import { Col, Button, FormSelect } from 'shards-react';
import DatePicker from 'react-datepicker'
import Masque from '../Other/Masque';
import { Row , Form} from 'shards-react';
import { fr } from 'date-fns/locale';

export default class FormulaireCommande extends Component {
    constructor(props){
        super(props)
        this.state = {startDate: new Date(),error: false, messageError: '',clients: []}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        var target = event.target
        switch (target.id) {
            case "categorie":
            target.value = new Masque().capitalize(target.value)
            break;
            default:
                break;
        }
        
    }
    handleSubmit(event){
        this.setState({error: false})
        event.preventDefault()
        var formData = Object.fromEntries(new FormData(event.target))
        if(formData.categorie.trim() === ""){
            this.setState({error : true, messageError: 'Champs vide'})
        }
        if(!this.state.error){
            this.props.onSubmit(formData)
        }
    }
    getClient(){
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
        this.getClient()
    }

    render() {
        var clientsOption = this.state.clients.map((value, index) => 
            <option key={index} value={value.numClient}> {value.nomClient + " " + value.prenomClient} </option>
        )
        return (
            <Col sm={12}>
            <Form onSubmit={this.handleSubmit}>
            <Row className="mt-4 mb-5">
                <Col sm={4}>
                    <FormSelect>
                        {clientsOption}
                    </FormSelect>
                    </Col>
                <Col sm={4}>
                    <DatePicker locale={fr} dateFormat="dd/MM/yyyy" maxDate={new Date()} selected={this.state.startDate} onChange={date => {this.setState({startDate: date})}} className="form-control" />
                </Col>
                <Col sm={2}>
                    <Button type="submit" className="mx-2" theme="primary">Cree</Button>
                </Col>
            </Row>
            
            </Form>
            </Col>
           
            
        )
    }
}
