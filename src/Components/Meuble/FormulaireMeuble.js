import React, { Component } from 'react'
import { Button, Form, FormGroup,FormInput, FormSelect } from 'shards-react';
import InputCustom from '../Other/InputCustom';
import PropTypes from 'prop-types'
import Masque from '../Other/Masque'
import Format from '../Other/Format';
export default class FormulaireMeuble extends Component {
  constructor(props){
    super(props)
    this.state = {categories : [],
        error: true,
        isValid : {"numserie": true, "nom" : true, "prix" : true},
        errorMessage: {"numserie": "", "nom" : "", "prix" : ""}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.field = ["numserie", "nom" , "prix"]
    this.isError = this.isError.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
    var formData = Object.fromEntries(new FormData(event.target))
    console.log(formData)
    for (let i = 0; i < this.field.length; i++) {
      var isValidTemp = this.state.isValid
      if(formData[this.field[i]] !== ""){
        isValidTemp[this.field[i]] = true
      }else{
        isValidTemp[this.field[i]] = false
        this.setState({error: true})
        var errorMessageTemp = this.state.errorMessage
        errorMessageTemp[this.field[i]] = "Champs vide"
      }
      this.setState({isValid: isValidTemp})
    }
    if(!this.state.error){
      formData.prix = new Format().unformatPrix(formData.prix)
      this.props.onSubmit(formData)
    }
  }
  isError(test: Boolean, fieldName: String, message: String) {
    var isValid
    var errorMessage
    if(test){
      isValid = this.state.isValid
      isValid[fieldName] = false
      errorMessage = this.state.errorMessage
      errorMessage[fieldName] = message
      this.setState({error: true})
    }
  }
  isEmpty(value){
      if(value.trim() !== ""){
        this.setState({error:false})
        return false
      }
      else{
        this.setState({error:true})
        return true
      }
  }
  handleChange(event){
    var target = event.target
    var format = new Format()
    var isValid
    var formData =  Object.fromEntries(new FormData(document.querySelector("#formulaire-meuble")))
    for (let i = 0; i < this.field.length; i++) {
        if(this.isEmpty(formData[this.field[i]]))
          break
    }
    switch(target.id){
      case "numserie":
          isValid = this.state.isValid
          isValid.numserie = true
          this.setState({isValid: isValid})
          this.isError(Number.isNaN(Number(target.value)), "numserie", "Veuillez entrez une valeur correcte")
        break;
      case "nom":
        target.value = new Masque().capitalize(target.value)
        break;
      case "prix":
        isValid = this.state.isValid
        isValid.prix = true
        this.setState({isValid: isValid})
        target.value = format.formatPrix(target.value)
        this.isError(Number.isNaN(Number(format.unformatPrix(target.value))), "prix", "Veuillez entrez une valeur correcte")
        break;
      default:
        console.log(event.target)
        break;
    }
    if(!this.state.error){
      for (let i = 0; i < Object.keys(this.state.isValid).length; i++) {
        if(!this.state.isValid[Object.keys(this.state.isValid)[i]]){
          this.setState({error : true})
        }
      }
    }
  }

    render() {
      const categories = this.state.categories.map((categorie, index) => <option key={index}>{categorie.categorie}</option>)
        return (
            <Form id="formulaire-meuble" onSubmit={this.handleSubmit}>
              <InputCustom onChange={this.handleChange} invalid={!this.state.isValid.numserie} errorMessage={this.state.errorMessage.numserie} placeholder="Numero de serie" name="numserie" label="Numero de serie" />
              <InputCustom onChange={this.handleChange} invalid={!this.state.isValid.nom} errorMessage={this.state.errorMessage.nom} placeholder="Nom" name="nom" label="Nom"/>
              <InputCustom onChange={this.handleChange} invalid={!this.state.isValid.prix} errorMessage={this.state.errorMessage.prix} placeholder="Prix" name="prix" label="Prix"/>
            <FormGroup>
              <label for="categorie">Select</label>
              <FormSelect name="categorie" id="categorie">
                {categories}
              </FormSelect>
            </FormGroup>
            
            <Button disabled={this.state.error} type="submit" theme="primary">{this.props.ajout ? "Ajouter" : "Modifier"}</Button>{' '}
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