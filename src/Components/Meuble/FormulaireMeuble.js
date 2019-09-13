import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import InputCustom from '../Other/InputCustom';
import PropTypes from 'prop-types'
export default class FormulaireMeuble extends Component {
  constructor(props){
    super(props)
    this.state = {categories : [],
        isValid : {"numserie": true, "nom" : true, "prix" : true},
        errorMessage: {"numserie": "", "nom" : "", "prix" : ""}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.field = ["numserie", "nom" , "prix"]
  }
  componentDidMount(){
    var req = new Request('http://localhost:8000/api/categories');
        fetch(req)
        .then(response => {
            response.json().then(data =>{
                    this.setState({categories: data});
                })
    });
    if(!this.props.ajout){
      this.props.addValue()
    }
  }
  handleSubmit(event){
    event.preventDefault()
    var error = false
    var formData = Object.fromEntries(new FormData(event.target))
    console.log(formData)
    for (let i = 0; i < this.field.length; i++) {
      var isValidTemp = this.state.isValid
      if(formData[this.field[i]] !== ""){
        isValidTemp[this.field[i]] = true
      }else{
        isValidTemp[this.field[i]] = false
        error = true
        var errorMessageTemp = this.state.errorMessage
        errorMessageTemp[this.field[i]] = "Champs vide"
      }
      this.setState({isValid: isValidTemp})
    }
    var isValid
    var errorMessage
    if(Number.isNaN(Number(formData.numserie))){
      error = true
      isValid = this.state.isValid
      isValid.numserie = false
      errorMessage = this.state.errorMessage
      errorMessage.numserie = "Veuillez entrez un valeur correct"
    }
    if(Number.isNaN(Number(formData.prix))){
      error = true
      isValid = this.state.isValid
      isValid.prix = false
      errorMessage = this.state.errorMessage
      errorMessage.prix = "Veuillez entrez un valeur correct"
    }
    if(!error){
      this.props.onSubmit(formData)
    }
  }
    render() {
      const categories = this.state.categories.map((categorie, index) => <option key={index}>{categorie.categorie}</option>)
        return (
            <Form onSubmit={this.handleSubmit}>
              <InputCustom invalid={!this.state.isValid.numserie} errorMessage={this.state.errorMessage.numserie} placeholder="Numero de serie" name="numserie" label="Numero de serie" />
              <InputCustom invalid={!this.state.isValid.nom} errorMessage={this.state.errorMessage.nom} placeholder="Nom" name="nom" label="Nom"/>
              <InputCustom invalid={!this.state.isValid.prix} errorMessage={this.state.errorMessage.prix} placeholder="Prix" name="prix" label="Prix"/>
            <FormGroup>
              <Label for="categorie">Select</Label>
              <Input type="select" name="categorie" id="categorie">
                {categories}
              </Input>
            </FormGroup>
            
            <Button type="submit" color="primary">{this.props.ajout ? "Ajouter" : "Modifier"}</Button>{' '}
            <Button onClick={this.props.onCancel} >Annuler</Button>
          </Form>
        )
    }
}
FormulaireMeuble.defaultProps = {ajout : true, addValue: function(){}}
FormulaireMeuble.propTypes = {
  onSubmit : PropTypes.func,
  ajout: PropTypes.bool,
  onCancel : PropTypes.func
}