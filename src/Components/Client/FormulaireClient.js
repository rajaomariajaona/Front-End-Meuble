import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import InputCustom from '../Other/InputCustom';

export default class FormulaireClient extends Component {
  constructor(props){
    super(props)
    this.state = {provinces : [],
      isValid: {nom: true, prenom: true, tel: true, email: true, adresse: true, cp: true},
      errorMessage: {nom: "", prenom: "", tel: "", email: "", adresse: "", cp: ""}
    }
    this.field = Object.keys(this.state.isValid)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    error = this.isError(error,(formData.tel.length !== 10 || Number.isNaN(Number(formData.tel)) || !/^03[2-4\9]/.test(formData.tel)),"tel", "Le numero telephone est incorrecte")
    error = this.isError(error,(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$/.test(formData.email)),"email", "Cette adresse est incorrecte")
    error = this.isError(error, (Number.isNaN(Number(formData.cp)) || formData.cp.length !== 3), "cp", "Veuillez entrez une valeur correcte")
    if(!error){
      this.props.onSubmit(formData)
    }
  }
  isError(error: Boolean,test: Boolean, fieldName: String, message: String) {
    var isValid
    var errorMessage
    if(test){
      error = true
      isValid = this.state.isValid
      isValid[fieldName] = false
      errorMessage = this.state.errorMessage
      errorMessage[fieldName] = message
    }
    return error
  }
  
  componentDidMount(){
    var req = new Request('http://localhost:8000/api/provinces');
        fetch(req)
        .then(response => {
            response.json().then(data =>{
                    this.setState({provinces: data});
                })
    });
    if(!this.props.ajout){
      this.props.addValue()
    }
  }
    render() {
      const provinces = this.state.provinces.map((province, index) => <option key={index}>{province.province}</option>)
        return (
            <Form onSubmit={this.handleSubmit}>
              <InputCustom invalid={!this.state.isValid.nom} errorMessage={this.state.errorMessage.nom}  placeholder="Nom" name="nom" label="Nom" />
              <InputCustom invalid={!this.state.isValid.prenom} errorMessage={this.state.errorMessage.prenom}  placeholder="Prenom" name="prenom" label="Prenom"/>
              <InputCustom invalid={!this.state.isValid.tel} errorMessage={this.state.errorMessage.tel}  placeholder="03xxxxxxxx" name="tel" label="Telephone"/>
              <InputCustom invalid={!this.state.isValid.email} errorMessage={this.state.errorMessage.email}  placeholder="Email" name="email" label="Email"/>
              <InputCustom invalid={!this.state.isValid.adresse} errorMessage={this.state.errorMessage.adresse}  placeholder="Adresse" name="adresse" label="Adresse" />
              <InputCustom invalid={!this.state.isValid.cp} errorMessage={this.state.errorMessage.cp}  placeholder="Code Postale" name="cp" label="Code Postale"/>

            <FormGroup>
              <Label for="province">Provinces</Label>
              <Input type="select" name="province" id="province">
                {provinces}
              </Input>
            </FormGroup>
            
            <Button type="submit" color="primary">{this.props.ajout ? "Ajouter" : "Modifier"}</Button>{' '}
            <Button onClick={this.props.onCancel} >Annuler</Button>
          </Form>
        )
    }
}
FormulaireClient.defaultProps = {ajout : true, addValue: function(){}}