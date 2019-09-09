import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import InputCustom from './InputCustom';

export default class FormulaireClient extends Component {
  constructor(props){
    super(props)
    this.state = {provinces : []
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
    render() {
      const provinces = this.state.provinces.map((province, index) => <option key={index}>{province.province}</option>)
        return (
            <Form onSubmit={this.props.onSubmit}>
              <InputCustom placeholder="Nom" name="nom" label="Nom" />
              <InputCustom placeholder="Prenom" name="prenom" label="Prenom"/>
              <InputCustom placeholder="03xxxxxxxx" name="tel" label="Telephone"/>
              <InputCustom placeholder="Email" name="email" label="Email" type="email" />
              <InputCustom placeholder="Adresse" name="adresse" label="Adresse" />
              <InputCustom placeholder="Code Postale" name="cp" label="Code Postale"/>

            <FormGroup>
              <Label for="province">Select</Label>
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