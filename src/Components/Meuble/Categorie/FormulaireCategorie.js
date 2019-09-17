import React, { Component } from 'react'
import { Col, Button } from 'shards-react';
import InputCustom from '../../Other/InputCustom';
import Masque from '../../Other/Masque';
import { Row , Form} from 'shards-react';

export default class FormulaireCategorie extends Component {
    constructor(props){
        super(props)
        this.state = {error: false, messageError: ''}
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
    render() {
        return (
            <Row className="my-4">
            <Form onSubmit={this.handleSubmit}>

            <Col sm={12}>
                <InputCustom invalid={this.state.error} onChange={this.handleChange}  placeholder="Categorie" name="categorie" label="Categorie" errorMessage={this.state.messageError}/>
            </Col>
            <div className="w-100"></div>
            <Col sm={12}>
                <Button className="mx-2" theme="primary">OK</Button>
                <Button onClick={this.props.toggle} className="mx-2" theme="secondary">Annuler</Button>
            </Col>
            </Form>
            </Row>
            
            

        )
    }
}
