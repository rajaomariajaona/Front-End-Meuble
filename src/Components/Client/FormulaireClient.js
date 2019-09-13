import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import InputCustom from '../Other/InputCustom';
import Masque from '../Other/Masque'
import Format from '../Other/Format';

export default class FormulaireClient extends Component {
  constructor(props){
    super(props)
    this.state = {provinces : [],
      isValid: {nom: true, prenom: true, tel: true, email: true, adresse: true, cp: true},
      errorMessage: {nom: "", prenom: "", tel: "", email: "", adresse: "", cp: ""},
    error: true
    }
    this.field = Object.keys(this.state.isValid)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.format = new Format()
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
    if(!error){
      formData.tel = this.format.unformatTel(formData.tel)
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

  handleChange(event){
    var target = event.target
    var formData =  Object.fromEntries(new FormData(document.querySelector("#formulaire-client")))
    for (let i = 0; i < this.field.length; i++) {
        if(this.isEmpty(formData[this.field[i]]))
          break
    }
    var isValid
    switch(target.id){
      case "nom":
        target.value = target.value.toUpperCase()
        break;
      case "prenom":
        target.value = new Masque().capitalizeWords(target.value)
        break;
      case "email":
        isValid = this.state.isValid
        isValid.email = true
        this.setState({isValid: isValid})
        this.isError((!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$/.test(formData.email)),"email", "Cette adresse est incorrecte")
        target.value = target.value.toLowerCase()
        break;
      case "tel":
        target.value = this.format.formatTel(target.value)
          isValid = this.state.isValid
          isValid.tel = true
          this.setState({isValid: isValid})
          this.isError(Number.isNaN(Number(this.format.unformatTel(formData.tel))) || this.format.unformatTel(formData.tel).length > 10,"tel", "Le numero telephone est incorrecte")
        break;
      case "cp":
          isValid = this.state.isValid
          isValid.cp = true
          this.setState({isValid: isValid})
          this.isError(Number.isNaN(Number(formData.cp)) || formData.cp.length > 3, "cp", "Veuillez entrez une valeur correcte")
        break
      default:
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
  handleOnBlur(event){
    var target = event.target
    var formData =  Object.fromEntries(new FormData(document.querySelector("#formulaire-client")))
    var isValid
    switch(target.id){
      case "tel":
          isValid = this.state.isValid
          isValid.tel = true
          this.setState({isValid: isValid})
          this.isError((this.format.unformatTel(formData.tel).length !== 10 || !/^03[2-4\9]/.test(this.format.unformatTel(formData.tel))) && this.format.unformatTel(formData.tel).trim() !== "","tel", "Le numero telephone est incorrecte")
        break;
      case "cp":
          isValid = this.state.isValid
          isValid.cp = true
          this.setState({isValid: isValid})
          this.isError(formData.cp.length !== 3 && formData.cp.trim() !== "", "cp", "Veuillez entrez une valeur correcte")
        break
      default:
        break;
    }
  }
    render() {
      const provinces = this.state.provinces.map((province, index) => <option key={index}>{province.province}</option>)
        return (
            <Form id="formulaire-client" onSubmit={this.handleSubmit}>
              <InputCustom onBlur={this.handleOnBlur} onChange={this.handleChange} invalid={!this.state.isValid.nom} errorMessage={this.state.errorMessage.nom}  placeholder="Nom" name="nom" label="Nom" />
              <InputCustom onBlur={this.handleOnBlur}  onChange={this.handleChange} invalid={!this.state.isValid.prenom} errorMessage={this.state.errorMessage.prenom}  placeholder="Prenom" name="prenom" label="Prenom"/>
              <InputCustom onBlur={this.handleOnBlur} onChange={this.handleChange} invalid={!this.state.isValid.tel} errorMessage={this.state.errorMessage.tel}  placeholder="03xxxxxxxx" name="tel" label="Telephone"/>
              <InputCustom onBlur={this.handleOnBlur}  onChange={this.handleChange} invalid={!this.state.isValid.email} errorMessage={this.state.errorMessage.email}  placeholder="Email" name="email" label="Email"/>
              <InputCustom onBlur={this.handleOnBlur}  onChange={this.handleChange} invalid={!this.state.isValid.adresse} errorMessage={this.state.errorMessage.adresse}  placeholder="Adresse" name="adresse" label="Adresse" />
              <InputCustom onBlur={this.handleOnBlur} onChange={this.handleChange} invalid={!this.state.isValid.cp} errorMessage={this.state.errorMessage.cp}  placeholder="Code Postale" name="cp" label="Code Postale"/>

            <FormGroup>
              <Label for="province">Provinces</Label>
              <Input type="select" name="province" id="province">
                {provinces}
              </Input>
            </FormGroup>
            
            <Button disabled={this.state.error} type="submit" color="primary">{this.props.ajout ? "Ajouter" : "Modifier"}</Button>{' '}
            <Button onClick={this.props.onCancel} >Annuler</Button>
          </Form>
        )
    }
}
FormulaireClient.defaultProps = {ajout : true, addValue: function(){}}