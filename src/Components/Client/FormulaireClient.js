import React, { Component } from 'react'
import { Button, Form, FormGroup, FormSelect, Row, Col } from 'shards-react';
import InputCustom from '../Other/InputCustom';
import Masque from '../Other/Masque'
import Format from '../Other/Format';
import Loading from '../Other/Loading';

export default class FormulaireClient extends Component {
  constructor(props){
    super(props)
    this.state = {provinces : [],
      isValid: {nom: true, prenom: true, tel: true, email: true, adresse: true, cp: true},
      errorMessage: {nom: "", prenom: "", tel: "", email: "", adresse: "", cp: ""},
    error: true,
    loading: false
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

postClient(formData){
  var parameters = {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(formData)
}
var req = new Request('http://localhost:8000/api/clients', parameters);
fetch(req)
.then(response => {
    if(response.status === 201){
      window.location.replace('/main/clients')
      this.getClient();
    }
});
}

putClient(formData){
  var parameters = {
      method: "PUT",
      headers:{
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(formData)
  }
  var req = new Request(this.link, parameters);
  fetch(req)
  .then(response => {
      if(response.status === 200){
        window.location.pathname= "/main/clients"
      }
  });
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
      if(this.props.ajout){
        this.postClient(formData)
      }else{
        this.putClient(formData)
      }
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
      this.setState({loading: true})
      this.link = window.location.href.replace("3000", "8000").replace("main", "api").replace("/modif", "")
      req = new Request(this.link);
      fetch(req)
      .then(response => {
        var client
          response.json().then(data =>{ 
            client = data
            this.setState({loading: false})
          }).then(() =>{
            document.querySelector("#nom").value = client.nomClient
            document.querySelector("#prenom").value = client.prenomClient
            document.querySelector("#adresse").value = client.adresseClient
            document.querySelector("#province").value = client.provinceClient.province
            document.querySelector("#cp").value = client.cpClient
            document.querySelector("#email").value = client.emailClient
            document.querySelector("#tel").value = client.telClient
          })
      });
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
        return ( (
          <div>
            {this.state.loading && <Loading />}
            <Form className="mt-3 " style={ this.state.loading?{display : 'none'} : {display : 'block'}} id="formulaire-client" onSubmit={this.handleSubmit}>
              <Row>
              <Col md={6} sm={12}>
              <InputCustom onBlur={this.handleOnBlur} onChange={this.handleChange} invalid={!this.state.isValid.nom} errorMessage={this.state.errorMessage.nom}  placeholder="Nom" name="nom" label="Nom" />
              </Col>
              <Col md={6} sm={12} >
              <InputCustom onBlur={this.handleOnBlur}  onChange={this.handleChange} invalid={!this.state.isValid.prenom} errorMessage={this.state.errorMessage.prenom}  placeholder="Prenom" name="prenom" label="Prenom"/>

              </Col>
              <Col md={6} sm={12} >
              <InputCustom onBlur={this.handleOnBlur}  onChange={this.handleChange} invalid={!this.state.isValid.email} errorMessage={this.state.errorMessage.email}  placeholder="Email" name="email" label="Email"/>

              </Col>
              <Col md={6} sm={12} >
              <InputCustom onBlur={this.handleOnBlur} onChange={this.handleChange} invalid={!this.state.isValid.tel} errorMessage={this.state.errorMessage.tel}  placeholder="03xxxxxxxx" name="tel" label="Telephone"/>

              </Col>
              <Col md={4} sm={12} >
              <InputCustom onBlur={this.handleOnBlur}  onChange={this.handleChange} invalid={!this.state.isValid.adresse} errorMessage={this.state.errorMessage.adresse}  placeholder="Adresse" name="adresse" label="Adresse" />

              </Col>
              <Col md={4} sm={12} >
              <InputCustom onBlur={this.handleOnBlur} onChange={this.handleChange} invalid={!this.state.isValid.cp} errorMessage={this.state.errorMessage.cp}  placeholder="Code Postale" name="cp" label="Code Postale"/>
                  
              </Col>
              <Col md={4} sm={12} >
                  
            <FormGroup>
              <label htmlFor="province">Provinces</label>
              <FormSelect name="province" id="province">
                {provinces}
              </FormSelect>
            </FormGroup>
              </Col>

            
            <Button className="mx-2" disabled={this.state.error} type="submit" theme="primary">{this.props.ajout ? "Ajouter" : "Modifier"}</Button>
            <Button  className="mx-2" theme="secondary" href={this.props.hrefCancel} onClick={this.props.onCancel} >Annuler</Button>
              </Row>
          </Form>
          </div>)
        )
    }
}
FormulaireClient.defaultProps = {ajout : true, addValue: function(){}}